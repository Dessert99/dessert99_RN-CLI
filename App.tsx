import RootNavigation from "./src/navigations/RootNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/queryClient";
import Toast from "react-native-toast-message";

const App = () => {
  return (
    <>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <RootNavigation />
          <Toast />
        </QueryClientProvider>
      </SafeAreaProvider>
    </>
  );
};

export default App;
