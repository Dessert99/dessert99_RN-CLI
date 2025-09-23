import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { StyleSheet, View } from "react-native";
import { colors } from "@/constants/colors";
import useForm from "@/hooks/useForm";
import { validateSignUp } from "@/utils/validation";
import { useAuth } from "@/hooks/queries/useAuth";

const SignUpScreen = () => {
  const { signupMutation, loginMutation } = useAuth();
  // 초기값 넣어준다.
  const signup = useForm({
    initailValue: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validate: validateSignUp,
  });
  const handleSubmit = () => {
    const { email, password } = signup.values;

    signupMutation.mutate(
      { email, password },
      //회원가입하면 자동 로그인
      { onSuccess: () => loginMutation.mutate({ email, password }) }
    );

    console.log("회원가입 로그", signup.values);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder='이메일'
          error={signup.errors.email}
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
          error={signup.errors.password}
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
          onSubmitEditing={handleSubmit}
          error={signup.errors.passwordConfirm}
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
        onPress={handleSubmit}
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
