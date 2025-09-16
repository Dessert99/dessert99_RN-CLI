import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStaticNavigation } from "@react-navigation/native";
import DrawerButton from "../components/DrawerButton";
import { colors } from "../constants/colors";

// 스크린
import CalendarScreen from "../screens/calendar/CalendarScreen";

// 스택
import { MapStack } from "./MapNavigation";
import { FeedStack } from "./FeedNavigation";
import CustomDrawerContent from "../components/CustomDrawerContent";

const MainDrawer = createDrawerNavigator({
  screenOptions: {
    // 드로어 너비, 색상
    drawerStyle: {
      width: "60%",
      backgroundColor: colors.WHITE,
    },
    // 드로어 폰트
    drawerLabelStyle: {
      fontWeight: "600",
    },
    // 드로어 아이템 스타일
    drawerItemStyle: {
      borderRadius: 5,
    },
    // 드로어 열리는 방식 (front는 화면을 덮는다.)
    drawerType: "front",
    // 선택 됐을 때 글자 색상
    drawerActiveTintColor: colors.WHITE,
    // 선택 됐을 때 배경색
    drawerActiveBackgroundColor: colors.PINK_700,
    // 선택되지 않았을 때 글자 색상
    drawerInactiveTintColor: colors.GRAY_500,
    // 선택되지 않았을 때 배경색
    drawerInactiveBackgroundColor: colors.GRAY_100,

    // 헤더 text 정렬
    headerTitleAlign: "center",
    // 헤더 이전 스크린 이름 없애기
    headerBackButtonDisplayMode: "minimal",
    // 헤더 text 색상
    headerTintColor: colors.BLACK,
    // 헤더 배경 스타일
    headerStyle: {
      backgroundColor: colors.WHITE,
      shadowColor: colors.BLACK,
    },
    //헤더 text 스타일
    headerTitleStyle: {
      fontSize: 16,
    },
  },

  screens: {
    Map: {
      screen: MapStack,
      options: {
        title: "홈",
        headerShown: false,
      },
    },
    Feed: {
      screen: FeedStack,
      options: {
        title: "피드",
        headerShown: false,
      },
    },
    Calendar: {
      screen: CalendarScreen,
      options: {
        title: "캘린더",
        headerLeft: () => <DrawerButton />,
      },
    },
  },
  drawerContent: (props) => <CustomDrawerContent {...props} />,
});

const DrawerNavigation = createStaticNavigation(MainDrawer);

export default DrawerNavigation;
