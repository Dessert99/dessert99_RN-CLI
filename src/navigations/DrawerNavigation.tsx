import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStaticNavigation } from "@react-navigation/native";

// 스크린
import CalendarScreen from "../screens/calendar/CalendarScreen";

// 스택
import { MapStack } from "./MapNavigation";
import { FeedStack } from "./FeedNavigation";

const MainDrawer = createDrawerNavigator({
  screens: {
    Map: MapStack,
    Feed: FeedStack,
    Calendar: {
      screen: CalendarScreen,
    },
  },
});

const DrawerNavigation = createStaticNavigation(MainDrawer);

export default DrawerNavigation;
