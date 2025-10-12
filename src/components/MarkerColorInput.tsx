import { colors } from "@/constants/colors";
import { StyleSheet, View, Text, ScrollView, Pressable } from "react-native";
import CustomMarker from "./CustomMarker";

interface MarkerColorInputProps {
  color: string;
  score: number;
  onChangeColor: (value: string) => void; // 색상을 변경하는 함수
}

function MarkerColorInput({
  color,
  score,
  onChangeColor,
}: MarkerColorInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.markerLabel}>마커선택</Text>
      <ScrollView
        horizontal // 가로 스크롤
        showsHorizontalScrollIndicator={false} // 스크롤 바 숨기기
      >
        <View style={styles.markerInputScroll}>
          {[
            colors.PINK_400,
            colors.GREEN_400,
            colors.YELLOW_400,
            colors.BLUE_400,
            colors.PURPLE_400,
          ].map((selectcolor) => {
            return (
              <Pressable
                style={[
                  styles.markerBox,

                  color === selectcolor && styles.pressedMarker, // 누르면 스타일 변경
                ]}
                onPress={() => onChangeColor(selectcolor)}>
                <CustomMarker
                  color={selectcolor}
                  key={selectcolor}
                  score={score} // 점수를 바로 연결해주면 마커 표정이 바뀐다.
                />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: 15,
  },
  markerLabel: {
    color: colors.GRAY_700,
    marginBottom: 15,
  },
  markerInputScroll: {
    flexDirection: "row",
    gap: 20,
  },
  markerBox: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: colors.GRAY_100,
  },
  pressedMarker: {
    borderWidth: 2,
    borderColor: colors.RED_500,
  },
});

export default MarkerColorInput;
