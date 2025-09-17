import AuthNavigation from "./AuthNavigation";
import DrawerNavigation from "./DrawerNavigation";

const RootNavigation = () => {
  const isLogin = false;
  return <>{isLogin ? <DrawerNavigation /> : <AuthNavigation />}</>;
};

export default RootNavigation;
