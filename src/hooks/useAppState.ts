import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

// 앱의 활성/비활성 전환 상태를 감지하는 훅
export function useAppState() {
  // 현재 앱 상태를 저장 (active, background, inactive)
  const appState = useRef(AppState.currentState);

  // 사용자가 백그라운드 → 포그라운드로 돌아왔는지 여부
  const [isComeback, setIsComeback] = useState(false);

  useEffect(() => {
    // 앱 상태 변화 감지 리스너 등록
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      // 백그라운드 상태였다가 다시 활성화된 경우 → 복귀로 판단
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        setIsComeback(true);
      }
      // 활성 상태였다가 백그라운드로 이동한 경우 → 복귀 아님
      if (appState.current.match(/active/) && nextAppState === "background") {
        setIsComeback(false);
      }
      // 현재 상태 갱신
      appState.current = nextAppState;
    });

    // 언마운트 시 이벤트 해제
    return () => {
      subscription.remove();
    };
  }, []);

  return { isComeback };
}
