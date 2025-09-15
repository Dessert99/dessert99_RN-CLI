import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../constants/colors";

// 스크린
import FeedListScreen from "../screens/feed/FeedListScreen";
import FeedDetailScreen from "../screens/feed/FeedDetailScreen";
import FeedFavoriteScreen from "../screens/feed/FeedFavoriteScreen";
import EditLocationScreen from "../screens/feed/EditLocationScreen";

export const FeedStack = createStackNavigator({
  screenOptions: {
    headerTitleAlign: "center", // 헤더 text 정렬
    headerBackButtonDisplayMode: "minimal", // 이전 스크린 이름 없애기
    headerTintColor: colors.BLACK, // 헤더 text 색상

    // 헤더 배경 스타일
    headerStyle: {
      backgroundColor: colors.WHITE,
      shadowColor: colors.BLACK,
    },

    //헤더 text 스타일
    headerTitleStyle: {
      fontSize: 16,
    },

    // 스택 내 모든 스크린 스타일
    cardStyle: {
      backgroundColor: colors.WHITE,
    },
  },
  screens: {
    FeedList: {
      screen: FeedListScreen,
      options: {
        headerShown: false,
      },
    },
    FeedDetail: {
      screen: FeedDetailScreen,
    },
    FeedFavorite: {
      screen: FeedFavoriteScreen,
    },
    EditLocation: {
      screen: EditLocationScreen,
    },
  },
});
