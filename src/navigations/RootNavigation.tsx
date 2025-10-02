import { useAuth } from "@/hooks/queries/useAuth";
import AuthNavigation from "./AuthNavigation";
import DrawerNavigation from "./DrawerNavigation";

const RootNavigation = () => {
  // const { isLogin } = useAuth();
  const isLogin = true;
  return <>{isLogin ? <DrawerNavigation /> : <AuthNavigation />}</>;
};

export default RootNavigation;
