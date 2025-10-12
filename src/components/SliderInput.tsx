import { colors } from "@/constants/colors";
import { StyleSheet, View, Text } from "react-native";
import Slider from "@react-native-community/slider";

interface SliderInputProps {
  score: number;
  onChangeScore: (value: number) => void;
}

function SliderInput({ score, onChangeScore }: SliderInputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>평점</Text>
        <Text style={styles.labelText}>{score}점</Text>
      </View>
      <Slider
        value={score}
        onValueChange={onChangeScore}
        step={1} // 1씩 증가
        minimumValue={1} // 최소
        maximumValue={5} // 최대
        minimumTrackTintColor={colors.PINK_700} // 채워진 트랙 컬러
        maximumTrackTintColor={colors.BLUE_400} // 안 채워진 트랙 컬러
        thumbTintColor={colors.GREEN_400} // 버튼 컬러
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.GRAY_200,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelText: {
    color: colors.GRAY_700,
  },
});

export default SliderInput;
