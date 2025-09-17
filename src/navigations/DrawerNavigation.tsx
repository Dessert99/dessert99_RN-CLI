import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStaticNavigation } from "@react-navigation/native";

//컴포넌트
import DrawerButton from "../components/DrawerButton";
import CustomDrawerContent from "@/components/CustomDrawerContent";

//색상
import { colors } from "../constants/colors";

// 스크린
import CalendarScreen from "../screens/calendar/CalendarScreen";

// 스택
import { MapStack } from "./MapNavigation";
import { FeedStack } from "./FeedNavigation";

//타입
import { MainDrawerParamList } from "../types/navigation";

//아이콘
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";

// 스크린마다 다른 아이콘을 표시한다.
function DrawerIcons(routeName: keyof MainDrawerParamList, focused: boolean) {
  let iconName;

  switch (routeName) {
    case "Map": {
      iconName = "map";
      break;
    }
    case "Feed": {
      iconName = "book";
      break;
    }
    case "Calendar": {
      iconName = "calendar";
      break;
    }
  }
  return (
    <FontAwesome6
      name={iconName}
      iconStyle='solid'
      size={20}
      color={focused ? colors.WHITE : colors.GRAY_300}
    />
  );
}

const MainDrawer = createDrawerNavigator({
  screenOptions: ({ route }) => {
    return {
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

      // 드로어 아이콘
      drawerIcon: ({ focused }) => DrawerIcons(route.name, focused),

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
    };
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
