import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

// Mutation의 에러 타입이다.
export type ResponseError = AxiosError<{
  statusCode: number;
  message: string;
  error: string;
}>;

// 리액트 쿼리 커스텀 mutation 타입. onSuccess, onError 같은 부가 옵션만 넣고,핵심 실행 함수(postSignup)는 훅이 책임진다.
export type UseMutationCustomOptions<
  TData = unknown,
  TVariables = unknown
> = Omit<
  UseMutationOptions<TData, ResponseError, TVariables, unknown>,
  "mutationFn"
>;
/*
TData : mutation 함수의 실행 결과로 반환되는 값의 타입이다.
TVariables : muatation 함수에 전달하는 인자의 타입니다.
TContext : onMutation 함수에서 반환하여 이후에 쓸 수 있는 context 값의 타입이다. (현재는 unknown이다.)
*/

// 리액트 쿼리 커스텀 Query 타입
export type UseQueryCustomOptions<
  TQueryFnData = unknown,
  TData = TQueryFnData
> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
  "queryKey"
>;
