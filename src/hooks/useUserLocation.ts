import Geolocation from "@react-native-community/geolocation";
import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";
import { useAppState } from "./useAppState";

//현재 위치 기능 훅으로 분리
export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5962,
    longitude: 127.0553,
  }); //사용자 위치
  const [userLocationError, setUserLocationError] = useState(false);
  const { isComeback } = useAppState();

  useEffect(() => {
    if (!isComeback) return;

    Geolocation.getCurrentPosition(
      //성공
      (info) => {
        console.log("info", info);
        setUserLocation(info.coords);
      },
      //에러
      () => {
        setUserLocationError(true);
      },
      //옵션
      {
        enableHighAccuracy: true, // 높은 정확성
      }
    );
  }, [isComeback]);
  return { userLocation, userLocationError };
}
