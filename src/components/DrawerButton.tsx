import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { MainDrawerParamList } from "../types/navigation";
import Ionicons from "@react-native-vector-icons/ionicons";
import { colors } from "../constants/colors";

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

interface DrawerButtonProps {
  color?: string;
  style?: StyleProp<ViewStyle>; //View 스타일을 타입 안전하게 받고, 배열/객체/null 등 어떤 형태로 넘겨도 에러 없이 받을 수 있게 하는 타입
}

const DrawerButton = ({ style, color = colors.BLACK }: DrawerButtonProps) => {
  const navigation = useNavigation<Navigation>(); // 이제 Drawer관련 함수들이 잘 추론된다.

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => navigation.openDrawer()}>
      <Ionicons
        name='menu'
        size={25}
        color={color}
      />
    </Pressable>
  );
};

export default DrawerButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
});
