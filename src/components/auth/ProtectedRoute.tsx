import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

interface IProps {
  isAuthenticated: boolean;
  redirectPath: string;
  children: ReactNode;
}

const ProtectedRoute = ({
  isAuthenticated,
  redirectPath,
  children,
}: IProps) => {
  const { isLoading } = useAppSelector((state) => state.loading);

  if (isLoading && !isAuthenticated) {
    //TODO without isLoading every refresh will go to '/login' then go back to home
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
