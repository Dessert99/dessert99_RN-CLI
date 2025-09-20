import axios from "axios";
import { Platform } from "react-native";

export const baseUrls = {
  android: "http://10.0.2.2:3030",
  ios: "http://localhost:3030",
};

// 안드로이드는 로컬호스트가 안된다.
export const instance = axios.create({
  baseURL: Platform.OS === "android" ? baseUrls.android : baseUrls.ios,
});

/*
만약 실제 기기로 테스트한다면 컴퓨터와 같은 ip주소로 해야 한다.
내부 ip주소로 해야 한다.

1. 맥
    - ifconfig | grep inet 명령어로 내부 주소를 파악할 수 있다.
    - 혹은 와이파이 -> 설정으로 들어가서 확인할 수 있다.
2. 윈도우
    - ipconfig 명령어로 내부 와이파이 주소를 알 수 있다.

⭐️ Tip
    - 현재 와이파이 주소를 사용하면 시뮬레이터, 실기기 모두 동작한다.
        ex) http://172.16.6.27:3030 로 통일.
*/
