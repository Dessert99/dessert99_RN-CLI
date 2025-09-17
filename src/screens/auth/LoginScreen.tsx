import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { StyleSheet, View } from "react-native";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField placeholder='이메일' />
        <InputField placeholder='비밀번호' />
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
