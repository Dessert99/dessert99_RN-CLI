import DrawerButton from "@/components/DrawerButton";
import { colors } from "@/constants/colors";
import { Alert, StyleSheet, View } from "react-native";

import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { useUserLocation } from "@/hooks/useUserLocation";
import { numbers } from "@/constants/numbers";
import { usePermission } from "@/hooks/usePermission";
import Toast from "react-native-toast-message";
import CustomMarker from "@/components/CustomMarker";
import { useMoveMapView } from "@/hooks/useMoveMapView";
import MapIconButton from "@/components/MapIconButton";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MapStackParamList } from "@/types/navigation";

type Navigation = StackNavigationProp<MapStackParamList>; // MapStackParamList를 기반으로, useNavigation() 훅이 어떤 화면 이름과 params를 쓸 수 있는지 알려주는 타입 생성

const MapHomeScreen = () => {
  const inset = useSafeAreaInsets(); // 노치 영역 길이 구하기
  const { userLocation, userLocationError } = useUserLocation(); //훅으로 분리
  const [selectLocation, setSelectLocation] = useState<LatLng | null>();
  const { mapRef, moveMapView, handleChangeDelta } = useMoveMapView();
  const navigation = useNavigation<Navigation>(); //any로 처리되는 걸 방지하고, 안전하게 네비게이션 함수 사용 가능
  usePermission("LOCATION"); // 권한 훅 사용

  // 마커 클릭 핸들러
  const handlePressMarker = (coordinate: LatLng) => {
    moveMapView(coordinate);
  };

  // "내 위치" 버튼 눌렀을 때: 권한/에러 확인 후 사용자 위치로 이동 핸들러
  const handlePressUserLocation = () => {
    if (userLocationError) {
      Toast.show({
        type: "error",
        text1: "위치 권한을 허용해주세요.",
        position: "bottom",
      });
      return;
    }
    moveMapView(userLocation);
  };

  // 장소 추가 핸들러
  const handlePressAddPost = () => {
    if (!selectLocation) {
      Alert.alert(
        "추가할 위치를 선택해주세요.",
        "지도를 길게 누르면 위치가 선택됩니다."
      );
      return;
    }

    // 선택한 위치를 props로 넘기며 화면 이동
    navigation.navigate("AddLocation", {
      location: selectLocation,
    });
  };

  return (
    <>
      <DrawerButton
        style={[styles.drawerButton, { top: inset.top + 10 }]} // 노치 영역만큼 top
        color={colors.WHITE}
      />

      <MapView
        googleMapId='75c4ced96389b9f59913bce7'
        ref={mapRef} // ref연결
        //초기 위치 설정 (델타와 함께)
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA, //초기 델타값
        }}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        //꾹 누르면 마커 생성
        onLongPress={({ nativeEvent }) =>
          setSelectLocation(nativeEvent.coordinate)
        }
        onRegionChangeComplete={handleChangeDelta} //지도의 영역(위치나 확대 정도)이 완전히 변경된 후 호출되는 콜백
      >
        {[
          {
            id: 1,
            color: colors.PINK_400,
            score: 3,
            coordinate: {
              latitude: 37.5862,
              longitude: 127.0553,
            },
          },
          {
            id: 2,
            color: colors.BLUE_400,
            score: 1,
            coordinate: {
              latitude: 37.5762,
              longitude: 127.0553,
            },
          },
          {
            id: 3,
            color: colors.PINK_500,
            score: 4,
            coordinate: {
              latitude: 37.5962,
              longitude: 127.0553,
            },
          },
        ].map((marker) => (
          <CustomMarker
            key={marker.id}
            color={marker.color}
            coordinate={marker.coordinate}
            onPress={() => handlePressMarker(marker.coordinate)}
          />
        ))}

        {selectLocation && <Marker coordinate={selectLocation} />}
      </MapView>
      <View
        style={styles.buttonList} //앵커. 버튼이 하나라면 Pressable에 해도 된다.
      >
        <MapIconButton
          name='plus'
          onPress={handlePressAddPost}
        />
        <MapIconButton
          name='location-crosshairs'
          onPress={handlePressUserLocation}
        />
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
});

export default MapHomeScreen;
