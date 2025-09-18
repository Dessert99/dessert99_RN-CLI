import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { StyleSheet, View } from "react-native";
import { colors } from "@/constants/colors";
import useForm from "@/hooks/useForm";

const SignUpScreen = () => {
  // 초기값 넣어준다.
  const signup = useForm({
    initailValue: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder='이메일'
          placeholderTextColor={colors.GREEN_400} // placeholder색상
          touched={signup.touched.email}
          selectionColor={colors.PINK_500} // 선택 영역 색상
          // value={signup.values.email}
          // onChangeText={(text) => signup.handleChangeValue("email", text)}
          // onBlur={() => signup.handleBlur("email")}
          {...signup.getTextInputProps("email")} // 펼쳐서 연결. 위 3줄과 동일하다.
        />
        <InputField
          placeholder='비밀번호'
          placeholderTextColor={colors.GREEN_400}
          touched={signup.touched.password}
          selectionColor={colors.PINK_500}
          maxLength={8} // 최대 글자
          secureTextEntry // 텍스트 가리기
          // value={signup.values.password}
          // onChangeText={(text) => signup.handleChangeValue("password", text)}
          // onBlur={() => signup.handleBlur("password")}
          {...signup.getTextInputProps("password")}
        />
        <InputField
          placeholder='비밀번호 확인'
          placeholderTextColor={colors.GREEN_400}
          touched={signup.touched.passwordConfirm}
          selectionColor={colors.PINK_500}
          secureTextEntry
          maxLength={8}
          // value={signup.values.passwordConfirm}
          // onChangeText={(text) =>
          //   signup.handleChangeValue("passwordConfirm", text)
          // }
          // onBlur={() => signup.handleBlur("passwordConfirm")}
          {...signup.getTextInputProps("passwordConfirm")}
        />
      </View>
      <CustomButton
        label='회원가입'
        variant='filled'
        size='large'
      />
    </View>
  );
};

export default SignUpScreen;

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
