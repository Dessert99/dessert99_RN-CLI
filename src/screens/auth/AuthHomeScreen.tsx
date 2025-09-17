import { StyleSheet, Image, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "@/types/navigation";

import CustomButton from "@/components/CustomButton";
import { colors } from "@/constants/colors";

type Navigation = StackNavigationProp<AuthStackParamList>;

const AuthHomeScreen = () => {
  const navigation = useNavigation<Navigation>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("@/assets/matzip.png")}
          resizeMode='contain'
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label='이메일 로그인'
          onPress={() => navigation.navigate("Login")}
        />
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.emailText}>이메일로 가입하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AuthHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: 200,
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 30,
    gap: 5,
  },
  emailText: {
    textDecorationLine: "underline",
    textAlign: "center",
    padding: 10,
    color: colors.BLACK,
    fontWeight: 500,
  },
});
