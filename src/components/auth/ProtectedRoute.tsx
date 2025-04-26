import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

interface IProps {
  isAuthenticated: boolean;
  redirectPath: string;
  children: ReactNode;
  isAuthRoute?: boolean; //* auth routes (login/register)
}

const ProtectedRoute = ({
  isAuthenticated,
  redirectPath,
  children,
  isAuthRoute = false,
}: IProps) => {
  const { isLoading } = useAppSelector((state) => state.loading);
  const localToken = localStorage.getItem("access_token");
  const isLoggedIn = !!localToken || isAuthenticated;

  if (!isLoading) {
    //TODO remove isLoading to stop loading page like anchor tag
    // Case 1: User is not logged in and trying to access a protected route
    if (!isLoggedIn && !isAuthRoute) {
      console.log("redirected Case:1");
      return <Navigate to={redirectPath} replace />;
    }

    // Case 2: User is logged in and trying to access an auth route (login/register)
    if (!!localToken && isAuthRoute) {
      console.log("redirected Case:2");
      return <Navigate to={redirectPath} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
