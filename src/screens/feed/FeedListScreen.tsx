import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FeedStackParamList } from "../../types/navigation";

type Navigation = StackNavigationProp<FeedStackParamList>;

const FeedListScreen = () => {
  const navigation = useNavigation<Navigation>();
  return (
    <View>
      <Text onPress={() => navigation.navigate("FeedDetail", { id: 1 })}>
        1번
      </Text>
    </View>
  );
};

export default FeedListScreen;
