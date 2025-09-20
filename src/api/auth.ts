import { Profile } from "@/types/domain";
import { getEncryptStorage } from "@/utils/encryptStorage";
import { instance } from "./instance";

//회원가입, 로그인 타입
type RequestUser = {
  email: string;
  password: string;
};

//토큰 반환 타입
type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

//회원가입 요청 : 따로 반환하는 값이 없기 때문에 반환값은 Promise<void>로 한다.
export const postSignup = async ({
  email,
  password,
}: RequestUser): Promise<void> => {
  await instance.post("/auth/signup", { email, password });
};

//로그인 요청 : 토큰을 반환한다.
export const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const { data } = await instance.post("/auth/signin", { email, password });

  return data; // accessToken, refreshToken
};

//유저 정보 요청 : 반환 타입은 domain에서 가져온다.
export const getProfile = async (): Promise<Profile> => {
  const { data } = await instance.get("/auth/me");
  return data; // id, email, nickname, imageUri, loginType
};

//토큰 요청 : 반환은 토큰 타입
export const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage("refreshToken");
  const { data } = await instance.get("/auth/refresh", {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return data; // accessToken, refreshToken
};

//로그아웃 요청
export const logout = async () => {
  await instance.post("/auth/logout");
};
