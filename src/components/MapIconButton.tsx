import { colors } from "@/constants/colors";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import React, { ComponentProps } from "react";
import { Pressable, StyleSheet } from "react-native";

// name은 FontAwesome6에 존재하는 이름으로 만든다.
type SolidIconName = Extract<
  ComponentProps<typeof FontAwesome6>,
  { iconStyle: "solid" }
>["name"]; //특정 조건을 만족하는 부분만 만든다.

interface MapIconButtonProps {
  name: SolidIconName;
  onPress: () => void;
}
/*
1️⃣ ComponentProps<typeof FontAwesome6> → FontAwesome6 컴포넌트의 props 타입 전체를 가져온다.
2️⃣ Extract<..., { iconStyle: "solid" }> → 그중 iconStyle이 "solid"인 props만 골라낸다.
3️⃣ ["name"] → 그 props의 name 속성 타입만 추출해서 SolidIconName으로 만든다.
*/

function MapIconButton({ name, onPress }: MapIconButtonProps) {
  return (
    <Pressable
      style={styles.mapButton}
      onPress={onPress}>
      <FontAwesome6
        name={name}
        iconStyle='solid'
        size={25}
        color={colors.WHITE}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mapButton: {
    backgroundColor: colors.PINK_700,
    height: 45,
    width: 45,
    margin: 10,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "1px 1px 3px rgba(0,0,0, 0.5)",
  },
});

export default MapIconButton;
