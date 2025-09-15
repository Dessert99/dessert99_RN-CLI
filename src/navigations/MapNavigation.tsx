import { createStackNavigator } from "@react-navigation/stack";

// 스크린
import MapHomeScreen from "../screens/map/MapHomeScreen";
import AddLocationScreen from "../screens/map/AddLocationScreen";
import SearchLocationScreen from "../screens/map/SearchLocationScreen";

// 이번에는 스택에 쌓으면서 네비게이션을 한 번에 만들어보자.
export const MapStack = createStackNavigator({
  screenOptions: {
    headerTitleAlign: "center", // 헤더 text 정렬
    headerBackButtonDisplayMode: "minimal", // 이전 스크린 이름 없애기
    headerTintColor: "black", // 헤더 text 색상

    // 헤더 배경 스타일
    headerStyle: {
      backgroundColor: "white",
      shadowColor: "black",
    },

    //헤더 text 스타일
    headerTitleStyle: {
      fontSize: 16,
    },
  },
  screens: {
    MapHome: {
      screen: MapHomeScreen,
      options: {
        headerShown: false,
      },
    },
    AddLocation: {
      screen: AddLocationScreen,
    },
    SearchLocation: {
      screen: SearchLocationScreen,
    },
  },
});
