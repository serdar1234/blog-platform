import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = ({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children?: ReactNode;
}) => {
  if (!isLoggedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  return children ? children : <Outlet />;
};
