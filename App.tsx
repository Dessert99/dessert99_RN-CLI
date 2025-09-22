import RootNavigation from "./src/navigations/RootNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/queryClient";

const App = () => {
  return (
    <>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <RootNavigation />
        </QueryClientProvider>
      </SafeAreaProvider>
    </>
  );
};

export default App;
