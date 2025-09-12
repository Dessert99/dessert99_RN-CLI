import { StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthHomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Text onPress={() => navigation.navigate("Login")}>로그인으로 가기</Text>
    </SafeAreaView>
  );
};

export default AuthHomeScreen;

const styles = StyleSheet.create({});
