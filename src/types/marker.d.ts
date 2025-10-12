import { LatLng, MapMarkerProps } from "react-native-maps";

// coordinate를 옵셔널로 사용하기 위한 모듈 증강
declare module "react-native-maps" {
  export interface MyMapMarkerProps extends MapMarkerProps {
    coordinate?: LatLng;
  }
}
