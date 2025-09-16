import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DrawerButton from "../../components/DrawerButton";

const MapHomeScreen = () => {
  return (
    <SafeAreaView>
      <Text>MapHomeScreen</Text>
      <DrawerButton />
    </SafeAreaView>
  );
};

export default MapHomeScreen;
