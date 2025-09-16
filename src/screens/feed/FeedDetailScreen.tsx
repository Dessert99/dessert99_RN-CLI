import { StackScreenProps } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { FeedStackParamList } from "../../types/navigation";

// 두 번째 인자로 스크린 이름(FeedDetail)까지 넣으면 더 정확한 추론이 가능하다.
type Props = StackScreenProps<FeedStackParamList, "FeedDetail">;

const FeedDetailScreen = ({ route }: Props) => {
  // route의 params 안에 id가 있다.
  const { id } = route.params;
  return (
    <View>
      <Text>FeedDetailScreen{id}</Text>
    </View>
  );
};

export default FeedDetailScreen;
