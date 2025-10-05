import Geolocation from "@react-native-community/geolocation";
import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";

//현재 위치 기능 훅으로 분리
export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5962,
    longitude: 127.0553,
  }); //사용자 위치
  const [userLocationError, setUserLocationError] = useState(false);

  useEffect(() => {
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
  }, []);
  return { userLocation, userLocationError };
}
