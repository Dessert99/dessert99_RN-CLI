import { colors } from "@/constants/colors";
import { StyleSheet, View } from "react-native";
import { LatLng, Marker, MyMapMarkerProps } from "react-native-maps";

interface CustomMarkerProps extends MyMapMarkerProps {
  coordinate?: LatLng;
  color: string;
  score?: number; // 점수(표정 결정용)
}

function CustomMarker({
  coordinate,
  color,
  score = 5,
  ...props
}: CustomMarkerProps) {
  // 위치를 받지 않고 CustomMarker를 쓰기 위해 분리
  const markerView = (
    <View style={styles.container}>
      <View style={[styles.marker, { backgroundColor: color }]}>
        <View style={[styles.eye, styles.leftEye]}></View>
        <View style={[styles.eye, styles.rightEye]}></View>
        {score > 3 && <View style={[styles.mouth, styles.good]}></View>}
        {score < 3 && <View style={[styles.mouth, styles.bad]}></View>}
        {score === 3 && <View style={[styles.soso]}></View>}
      </View>
    </View>
  );

  return coordinate ? (
    <Marker
      coordinate={coordinate}
      {...props}>
      {markerView}
    </Marker>
  ) : (
    markerView
  );
}

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: 35,
    alignItems: "center",
  },
  // 얼굴(물방울) 베이스
  marker: {
    transform: [{ rotate: "45deg" }], // 시계 방향 45도 회전
    width: 27,
    height: 27,
    borderRadius: 27,
    borderColor: colors.BLACK,
    borderWidth: 1,
    borderBottomRightRadius: 1, // 한쪽 모서리만 날카롭게 → 꼭짓점 느낌
  },
  eye: {
    position: "absolute",
    backgroundColor: colors.BLACK,
    width: 4,
    height: 4,
    borderRadius: 4,
  },
  leftEye: {
    top: 12,
    left: 5,
  },
  rightEye: {
    top: 5,
    left: 12,
  },
  mouth: {
    transform: [{ rotate: "45deg" }], // 대각선 회전으로 입선 모양
    width: 12,
    height: 12,
    borderWidth: 1,
    borderRadius: 12,
    borderTopColor: "rgba(255,255,255 / 0.01)", // 윗부분 투명 처리
    borderBottomColor: "rgba(255,255,255 / 0.01)", // 아랫부분 투명 처리
  },
  good: {
    marginLeft: 5,
    marginTop: 5,
    borderLeftColor: "rgba(255,255,255 / 0.01)", // 왼쪽 부분 숨김 → 웃는 곡선 느낌
  },
  bad: {
    marginLeft: 12,
    marginTop: 12,
    borderRightColor: "rgba(255,255,255 / 0.01)", // 오른쪽 부분 숨김 → 찡그린 입
  },
  soso: {
    width: 8,
    height: 8,
    borderLeftColor: colors.BLACK,
    borderLeftWidth: 1,
    marginLeft: 13,
    marginTop: 13,
    transform: [{ rotate: "45deg" }],
  },
});

export default CustomMarker;
