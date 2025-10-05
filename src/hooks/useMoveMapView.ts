import { numbers } from "@/constants/numbers";
import { useRef, useState } from "react";
import MapView, { LatLng, Region } from "react-native-maps";

type Delta = Pick<Region, "latitudeDelta" | "longitudeDelta">; //타입 Region에서 특정 속성들만 뽑아서 새로운 타입을 만든다.

export function useMoveMapView() {
  const mapRef = useRef<MapView>(null); // 맵 이동을 위한 ref. MapView는 ref가 가리키는 “컴포넌트 인스턴스 타입”이다. MapView의 인스턴스 메서드를 타입 안정성 있게 쓸 수 있다.
  const [regionDelta, setRegionDelta] = useState<Delta>(numbers.INITIAL_DELTA);

  // 지도 카메라를 주어진 좌표로 부드럽게 이동시키는 헬퍼(줌/델타 포함)
  const moveMapView = (coordinate: LatLng, delta?: Delta) => {
    // Region에는 델타라는 것도 보내줘야 한다. (델타 = 지도의 확대 정도)
    mapRef.current?.animateToRegion({
      ...coordinate,
      ...(delta ?? regionDelta),
    });
  };

  // 지도 영역 변경 감지를 위한 핸들러
  const handleChangeDelta = (region: Region) => {
    const { latitudeDelta, longitudeDelta } = region;
    setRegionDelta({ latitudeDelta, longitudeDelta });
  };

  return { mapRef, moveMapView, handleChangeDelta };
}
