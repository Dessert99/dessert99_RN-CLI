import { StyleSheet, TextInput, View } from "react-native";
import { useRef } from "react";
import { colors } from "@/constants/colors";
//컴포넌트
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
//유효성 검사
import { validateLogin } from "@/utils/validation";
//커스텀 훅
import useForm from "@/hooks/useForm";
import { useAuth } from "@/hooks/queries/useAuth";

const LoginScreen = () => {
  const { loginMutation } = useAuth();
  const passwordRef = useRef<TextInput | null>(null);
  const login = useForm({
    initailValue: {
      email: "",
      password: "",
    },
    validate: validateLogin, //에러를 반환한다.
  });

  // 제출 함수
  const handleSubmit = () => {
    loginMutation.mutate(login.values);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus // 페이지 들어왔을 때 포커스
          submitBehavior='submit' // 엔터 눌러도 입력창 안 닫힘
          onSubmitEditing={() => passwordRef.current?.focus()} // 이메일 입력하고 엔터 누르면 비밀번호로 포커스 이동
          placeholderTextColor={colors.GRAY_500} // placeholder색상
          returnKeyType='next' // 엔터키 종류 바꾸기
          inputMode='email' // 키보드에 @ 키가 생김.
          placeholder='이메일'
          error={login.errors.email}
          touched={login.touched.email}
          selectionColor={colors.PINK_500} // 선택 영역 색상
          {...login.getTextInputProps("email")}
        />
        <InputField
          ref={passwordRef} // 포커스될 부분
          onSubmitEditing={handleSubmit} // 비밀번호 입력하고 엔터 눌러도 제출
          placeholder='비밀번호'
          error={login.errors.password}
          placeholderTextColor={colors.GRAY_500}
          returnKeyType='join' // 엔터키 종류 바꾸기
          touched={login.touched.password}
          selectionColor={colors.PINK_500}
          maxLength={20} // 최대 글자
          secureTextEntry // 텍스트 가리기
          {...login.getTextInputProps("password")}
        />
      </View>
      <CustomButton
        label='로그인'
        variant='filled'
        size='large'
        onPress={handleSubmit}
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
