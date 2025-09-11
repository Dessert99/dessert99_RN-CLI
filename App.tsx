import {
  View,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Button,
  Alert,
  Text,
  Pressable,
} from "react-native";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  const [text, setText] = useState("");
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          <TextInput
            value={text}
            onChangeText={setText}
          />
          <Button
            title='Press me'
            color={"green"}
            onPress={() => Alert.alert("버튼 연습")}
          />
          <Pressable onPress={() => Alert.alert("Pressable연습")}>
            <TouchableHighlight onPress={() => Alert.alert("Touchable연습")}>
              <View style={styles.button}>
                <Text>Touch Here</Text>
              </View>
            </TouchableHighlight>
            <Text>Im pressable!</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

export default App;
