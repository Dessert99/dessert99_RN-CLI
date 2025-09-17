import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "@/types/navigation";

import CustomButton from "@/components/CustomButton";

type Navigation = StackNavigationProp<AuthStackParamList>;

const AuthHomeScreen = () => {
  const navigation = useNavigation<Navigation>();
  return (
    <SafeAreaView>
      <CustomButton
        label='이메일 로그인'
        onPress={() => navigation.navigate("Login")}
      />
    </SafeAreaView>
  );
};

export default AuthHomeScreen;

const styles = StyleSheet.create({});
