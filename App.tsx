import RootNavigation from "./src/navigations/RootNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/queryClient";
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";
import { colors } from "@/constants/colors";

// 토스트 메시지 커스텀
const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.BLUE_500 }}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: colors.RED_500 }}
      //제목 크기
      text1Style={{
        fontSize: 15,
      }}
      //설명 크기
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
};

const App = () => {
  return (
    <>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <RootNavigation />
          <Toast config={toastConfig} />
        </QueryClientProvider>
      </SafeAreaProvider>
    </>
  );
};

export default App;
