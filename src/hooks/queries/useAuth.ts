import {
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
} from "@/api/auth";
import { queryClient } from "@/api/queryClient";
import { queryKeys, storageKeys } from "@/constants/keys";
import { numbers } from "@/constants/numbers";
import { UseMutationCustomOptions, UseQueryCustomOptions } from "@/types/api";
import { Profile } from "@/types/domain";
import {
  removeEncryptStorage,
  setEncryptStorage,
} from "@/utils/encryptStorage";
import { removeHeader, setHeader } from "@/utils/header";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

/*
onSuccess -> 요청이 성공했을 때
onError -> 에러났을 때
onSettled -> 성공 실패와 관련없이 실행
*/

// 회원가입 훅 : 필요한 옵션을 밖에서 주입받아서 사용한다.
export const useSignup = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
};

// 로그인 훅
export const useLogin = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken, refreshToken }) => {
      setHeader("Authorization", `Bearer ${accessToken}`);
      await setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      // 로그인 후에 토큰 갱신 훅이 실행되도록 만들기
      queryClient.fetchQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
    },
    ...mutationOptions,
  });
};

//토큰 갱신 훅
export const useGetRefreshTokeny = () => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME, // 시간 주기에 따라 리패치
  });

  //요청이 성공했을 때는 헤더의 엑세스 토큰과 Encrypt Storage에 있는 리프레쉬 토큰을 교체한다.
  useEffect(() => {
    (async () => {
      if (isSuccess) {
        setHeader("Authorization", `Bearer ${data.accessToken}`);
        await setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
      }
    })();
    console.log("/queries/useAuth.ts : 리프레시 갱신 로직-Success");
  }, [isSuccess]);

  //요청이 실패했을 때는 토큰을 모두 지워준다.
  useEffect(() => {
    (async () => {
      if (isError) {
        removeHeader("Authorization");
        await removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      }
    })();
    console.log("/queries/useAuth.ts : 리프레시 갱신 로직-Error");
  }, [isError]);

  return { isSuccess, isError };
};

// 로그인 성공 시 내정보를 받아오는 훅
export function useGetProfile(queryOptions?: UseQueryCustomOptions<Profile>) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
}

//로그아웃
export function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      removeHeader("Authorization"); // 헤더 지우고
      removeEncryptStorage(storageKeys.REFRESH_TOKEN); // 토큰 지우고
      queryClient.resetQueries({ queryKey: [queryKeys.AUTH] }); // 쿼리키가 auth인 쿼리들 지워주기
    },
    ...mutationOptions,
  });
}

// 훅들을 묶어서 사용하기
export function useAuth() {
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const refreshTokenQuery = useGetRefreshTokeny();

  // 로그인이 되었는지 상태
  const { data, isSuccess: isLogin } = useGetProfile({
    enabled: refreshTokenQuery.isSuccess, //true 일때만 useGetProfile이 호출된다. refreshToken쿼리가 성공할 때 프로필 요청 로직 실행
  });

  const logoutMutation = useLogout();

  return {
    auth: {
      id: data?.id || "",
      nickname: data?.nickname || "",
      email: data?.email || "",
      imageUri: data?.imageUri || "",
    },

    signupMutation,
    loginMutation,
    isLogin,
    logoutMutation,
  };
}
