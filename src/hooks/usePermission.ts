import { useEffect } from "react";
import { Alert, Linking, Platform } from "react-native";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";

//호출이 되면 권한을 체크한다.
export function usePermission() {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === "android";

      // OS에 맞는 위치 권한 상수 선택(FINE vs WHEN_IN_USE)
      const permissionOS = isAndroid
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

      // 현재 권한 상태 조회: granted/denied/blocked/unavailable
      const checked = await check(permissionOS);
      console.log("checked", checked);

      // 위치 권한이 차단된 경우 사용자에게 알림을 띄워 앱 설정 화면으로 이동하도록 안내하는 함수
      const showPermissionAlert = () => {
        Alert.alert(
          "위치 권한이 필요합니다.",
          "설정 화면에서 위치 권한을 허용해주세요.",
          [
            { text: "설정하기", onPress: () => Linking.openSettings() }, // 설정으로 이동 버튼. 실기기에서는 앱 설정까지 들어간다.
            { text: "취소", style: "cancel" }, // 취소 버튼
          ]
        );
      };

      // 권한이 없다면 alert 띄우기
      switch (checked) {
        //android권한
        case RESULTS.DENIED:
          if (isAndroid) {
            showPermissionAlert();
            return;
          }
          await request(permissionOS);
          break;

        //ios권한
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          showPermissionAlert();
          break;
      }
    })();
  }, []);
}

/*
usePermission 훅이 하는 일
1. 권한을 체크
2. 권한이 거부된 상태라면 Alert창을 띄우고 권한 설정 창을 띄워준다.
*/
