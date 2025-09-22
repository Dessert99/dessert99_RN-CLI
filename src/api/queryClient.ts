import { QueryClient } from "@tanstack/react-query";

// use Query -> 데이터 패칭 , use Mutation -> 데이터 업데이트
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 60 * 1000, // 1분
    },
    mutations: {
      retry: false,
    },
  },
});
