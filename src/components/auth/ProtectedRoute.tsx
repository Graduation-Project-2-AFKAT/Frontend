import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  isAuthenticated: boolean;
  redirectPath: string;
  children: ReactNode;
  data?: unknown;
}

const ProtectedRoute = ({
  isAuthenticated,
  redirectPath,
  children,
  data,
}: IProps) => {
  if (!isAuthenticated)
    return <Navigate to={redirectPath} replace state={data} />;

  return children;
};

export default ProtectedRoute;
