import { NavigatorScreenParams } from "@react-navigation/native";

// Map스택 타입
export type MapStackParamList = {
  MapHome: undefined;
  AddLocation: undefined;
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
