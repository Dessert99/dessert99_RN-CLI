import DrawerButton from "@/components/DrawerButton";
import { colors } from "@/constants/colors";
import { StyleSheet, View, Pressable } from "react-native";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";

import MapView, { LatLng, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef } from "react";
import { useUserLocation } from "@/hooks/useUserLocation";
import { numbers } from "@/constants/numbers";

const MapHomeScreen = () => {
  const inset = useSafeAreaInsets(); // 노치 영역 길이 구하기
  const mapRef = useRef<MapView>(null); // 맵 이동을 위한 ref. MapView는 ref가 가리키는 “컴포넌트 인스턴스 타입”이다. MapView의 인스턴스 메서드를 타입 안정성 있게 쓸 수 있다.
  const { userLocation, userLocationError } = useUserLocation(); //훅으로 분리

  // 지도 카메라를 주어진 좌표로 부드럽게 이동시키는 헬퍼(줌/델타 포함)
  const moveMapView = (coordinate: LatLng) => {
    // Region에는 델타라는 것도 보내줘야 한다. (델타 = 지도의 확대 정도)
    mapRef.current?.animateToRegion({
      ...coordinate,
      ...numbers.INITIAL_DELTA, // 초기 델타값
    });
  };

  // "내 위치" 버튼 눌렀을 때: 권한/에러 확인 후 사용자 위치로 이동 핸들러
  const handlePressUserLocation = () => {
    if (userLocationError) {
      //위치 권한을 허용해주세요.
      return;
    }
    moveMapView(userLocation);
  };

  return (
    <>
      <DrawerButton
        style={[styles.drawerButton, { top: inset.top + 10 }]} // 노치 영역만큼 top
        color={colors.WHITE}
      />
      <MapView
        ref={mapRef} // ref연결
        //초기 위치 설정 (델타와 함께)
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA, //초기 델타값
        }}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
      />
      <View
        style={styles.buttonList} //앵커. 버튼이 하나라면 Pressable에 해도 된다.
      >
        <Pressable
          style={styles.mapButton}
          onPress={handlePressUserLocation}>
          <FontAwesome6
            name='location-crosshairs'
            iconStyle='solid'
            size={25}
            color={colors.WHITE}
          />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 1,
    backgroundColor: colors.PINK_700,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopRightRadius: 50, // 모서리
    borderBottomRightRadius: 50, // 모서리
    boxShadow: "1px 1px 3px rgba(0,0,0, 0.5)",
  },
  buttonList: {
    position: "absolute",
    bottom: 30,
    right: 20,
    zIndex: 1,
  },
  mapButton: {
    backgroundColor: colors.PINK_700,
    height: 45,
    width: 45,
    margin: 10,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "1px 1px 3px rgba(0,0,0, 0.5)",
  },
});

export default MapHomeScreen;
