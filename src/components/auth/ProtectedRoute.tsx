import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
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
  const { user } = useAppSelector((state) => state.users);
  const { Game } = useAppSelector((state) => state.games);
  const { Asset } = useAppSelector((state) => state.assets);

  const location = useLocation();

  const localToken = localStorage.getItem("access_token");
  const isLoggedIn = !!localToken || isAuthenticated;

  if (!isLoading) {
    const urlResources = location.pathname.split("/");
    const isEdit = urlResources[urlResources.length - 1] === "edit";
    const pathId = urlResources[urlResources.length - 2];
    const pathEnd = urlResources[urlResources.length - 3];
    const isNumber = pathId && !isNaN(Number(pathId));

    // if (
    //   isEdit &&
    //   isNumber &&
    //   ((pathEnd === "games" && Game && Game?.user_id !== user?.id) ||
    //     (pathEnd === "arts" && Asset && Asset?.user_id !== user?.id))
    // ) {
    //   console.log("in");
    //   const contentPath = location.pathname.replace(/\/edit$/, "");

    //   return (
    //     <Navigate
    //       to={contentPath}
    //       replace
    //       state={{
    //         permissionDenied: true,
    //         message: "You don't have permission to edit this content",
    //       }}
    //     />
    //   );
    // }

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
