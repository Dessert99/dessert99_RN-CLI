import { instance } from "@/api/instance";
import { useEffect, useState } from "react";
import Config from "react-native-config";
import { LatLng } from "react-native-maps";

export function useGetAddress(location: LatLng) {
  const { latitude, longitude } = location;
  const [result, setResult] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address&key=${Config.GOOGLE_MAP_API_KEY}&language=ko`
        ); //result_type=street_address 옵션으로 정확한 주소 한 개 가져오기
        const address = data.results.length // 주소가 있으면 가져오기. 없으면 위도경도 표시
          ? data.results[0].formatted_address
          : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}}`;
        setResult(address);
      } catch (error) {
        setResult("주소를 알 수 없습니다.");
      }
    })();
  }, [latitude, longitude]);

  return result;
}
