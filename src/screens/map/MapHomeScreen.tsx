import DrawerButton from "@/components/DrawerButton";
import { colors } from "@/constants/colors";
import { StyleSheet, View, Pressable } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";

import MapView, { LatLng, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

const MapHomeScreen = () => {
  const inset = useSafeAreaInsets(); // 노치 영역 길이 구하기
  const [userLocation, setUserLocation] = useState<LatLng>(); //사용자 위치
  const [useLocationError, setUserLocationError] = useState(false);
  useEffect(() => {
    // 1. 성공시 내 위치 2. 에러 상황 3. 옵션
    Geolocation.getCurrentPosition(
      (info) => {
        console.log("info", info);
        setUserLocation(info.coords);
      },
      () => {
        setUserLocationError(true);
      },
      {
        enableHighAccuracy: true, // 높은 정확성
      }
    );
  }, []);

  return (
    <>
      <DrawerButton
        style={[styles.drawerButton, { top: inset.top + 10 }]} // 노치 영역만큼 top
        color={colors.WHITE}
      />
      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
      />
      <View
        style={styles.buttonList} //앵커. 버튼이 하나라면 Pressable에 해도 된다.
      >
        <Pressable style={styles.mapButton}>
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
