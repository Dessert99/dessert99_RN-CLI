import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { colors } from "@/constants/colors";
import useForm from "@/hooks/useForm";
import { StyleSheet, View } from "react-native";

const LoginScreen = () => {
  const login = useForm({
    initailValue: {
      email: "",
      password: "",
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder='이메일'
          placeholderTextColor={colors.GRAY_500} // placeholder색상
          touched={login.touched.email}
          selectionColor={colors.PINK_500} // 선택 영역 색상
          {...login.getTextInputProps("email")}
        />
        <InputField
          placeholder='비밀번호'
          placeholderTextColor={colors.GRAY_500}
          touched={login.touched.password}
          selectionColor={colors.PINK_500}
          maxLength={8} // 최대 글자
          secureTextEntry // 텍스트 가리기
          {...login.getTextInputProps("password")}
        />
      </View>
      <CustomButton
        label='로그인'
        variant='filled'
        size='large'
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});
