import { Pressable } from "react-native";
import { Text } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { MainDrawerParamList } from "../types/navigation";

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

const DrawerButton = () => {
  const navigation = useNavigation<Navigation>(); // 이제 Drawer관련 함수들이 잘 추론된다.

  return (
    <Pressable onPress={() => navigation.openDrawer()}>
      <Text>서랍</Text>
    </Pressable>
  );
};

export default DrawerButton;
