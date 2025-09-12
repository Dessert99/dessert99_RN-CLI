import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStaticNavigation } from "@react-navigation/native";

// 스크린
import CalendarScreen from "../screens/calendar/CalendarScreen";
import FeedListScreen from "../screens/feed/FeedListScreen";
import MapHomeScreen from "../screens/map/MapHomeScreen";

const MainDrawer = createDrawerNavigator({
  screens: {
    Map: MapHomeScreen,
    Feed: FeedListScreen,
    Calendar: CalendarScreen,
  },
});

const DrawerNavigation = createStaticNavigation(MainDrawer);

export default DrawerNavigation;
