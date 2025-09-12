import { createStaticNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// 스크린
import AuthHomeScreen from "../screens/auth/AuthHomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";

// 스크린으로 스택 쌓기
const AuthStack = createStackNavigator({
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

    // 스택 내 모든 스크린 스타일
    cardStyle: {
      backgroundColor: "white",
    },
  },

  screens: {
    AuthHome: {
      screen: AuthHomeScreen,

      // AuthHome 스크린 옵션 설정
      options: {
        headerShown: false, // 헤더 가리기
      },
    },
    Login: {
      screen: LoginScreen,
      options: {
        title: "로그인",
      },
    },
    SignUp: {
      screen: SignUpScreen,
      options: {
        title: "회원가입",
      },
    },
  },
});

// 스택을 네비게이션으로 만드는 방법.
const AuthNavigation = createStaticNavigation(AuthStack);

export default AuthNavigation;
