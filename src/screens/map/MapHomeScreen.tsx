import DrawerButton from "@/components/DrawerButton";
import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";
import Geolocation from "@react-native-community/geolocation";

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
});

export default MapHomeScreen;
