import { colors } from "@/constants/colors";
import { Ref } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextInputProps,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  ref?: Ref<TextInput>; // ref를 Props로 넘겨주기
  error?: string;
  touched?: boolean;
}

const InputField = ({ ref, error, touched, ...props }: InputFieldProps) => {
  return (
    <View>
      <TextInput
        ref={ref}
        autoCapitalize='none' // 자동 대문자화를 끈다.
        spellCheck={false} // ios에서 맞춤법 밑줄 비활성
        autoCorrect={false} // 자동 교정/제안 끔
        style={[styles.input, touched && Boolean(error) && styles.inputError]}
        {...props}
      />
      {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    justifyContent: "center",
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors.BLACK,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_500,
  },
});
