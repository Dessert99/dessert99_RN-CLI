import { NavigatorScreenParams } from "@react-navigation/native";
import { LatLng } from "react-native-maps";

// Map스택 타입 : Stack 네비게이션에서 사용할 “화면 이름과 전달될 파라미터 타입”을 정의
export type MapStackParamList = {
  MapHome: undefined;
  AddLocation: { location: LatLng }; // AddLocation으로 이동 시 필수 파라미터: 추가할 위치 좌표(LatLng)
  SearchLocation: undefined;
};

// Feed스택 타입
export type FeedStackParamList = {
  FeedList: undefined;
  FeedDetail: { id: number }; // FeedDetail은 number타입의 id를 파라미터로 받는다.
  FeedFavorite: undefined;
  EditLocation: { id: number }; // 동일
};

// Auth스택 타입
export type AuthStackParamList = {
  AuthHome: undefined;
  Login: undefined;
  SignUp: undefined;
};

// 드로어 타입
export type MainDrawerParamList = {
  Map: NavigatorScreenParams<MapStackParamList>;
  Feed: NavigatorScreenParams<FeedStackParamList>;
  Calendar: undefined;
};

// react navigation 전역 타입을 커스터마이징하고 확장
declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainDrawerParamList {}
  }
}
