import AuthNavigation from "./src/navigations/AuthNavigation";
import DrawerNavigation from "./src/navigations/DrawerNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <>
      <SafeAreaProvider>
        {/* <AuthNavigation /> */}
        <DrawerNavigation />
      </SafeAreaProvider>
    </>
  );
};

export default App;
