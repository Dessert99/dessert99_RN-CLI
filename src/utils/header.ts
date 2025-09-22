import { instance } from "@/api/instance";

export function setHeader(key: string, value: string) {
  // default 옵션 : 헤더에 default값으로 넣어줄 수 있다.
  instance.defaults.headers.common[key] = value;
}

export function removeHeader(key: string) {
  //헤더에 비었다면 리턴
  if (!instance.defaults.headers.common[key]) return;

  delete instance.defaults.headers.common[key];
}
