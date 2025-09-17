import { colors } from "@/constants/colors";
import { StyleSheet, Text, Pressable, PressableProps } from "react-native";

interface CustomButtonProps extends PressableProps {
  label: string; // 필수 속성 (반드시 있어야 함)
  variant?: "filled" | "outlined"; // 선택(옵셔널) 속성
  size?: "large" | "small";
}

const CustomButton = ({
  label,
  variant = "filled",
  size = "large",
  ...props
}: CustomButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[variant],
        styles[size],
        pressed && styles.pressed, // 눌린 상태면 투명도 0.8
      ]}
      {...props}>
      <Text style={styles[`${variant}Text`]}>{label}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  filled: {
    backgroundColor: colors.PINK_700,
  },
  outlined: {
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.PINK_700,
  },
  filledText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.WHITE,
  },
  outlinedText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.PINK_700,
  },
  large: {
    width: "100%",
    height: 45,
  },
  small: {
    paddingHorizontal: 10,
    height: 30,
  },
  pressed: {
    opacity: 0.8,
  },
});
