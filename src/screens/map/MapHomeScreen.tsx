import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DrawerButton from "../../components/DrawerButton";
import { useAuth } from "@/hooks/queries/useAuth";

const MapHomeScreen = () => {
  const { logoutMutation } = useAuth();
  return (
    <SafeAreaView>
      <Text>MapHomeScreen</Text>
      <DrawerButton />
      <Text onPress={() => logoutMutation.mutate(null)}>로그아웃</Text>
    </SafeAreaView>
  );
};

export default MapHomeScreen;
