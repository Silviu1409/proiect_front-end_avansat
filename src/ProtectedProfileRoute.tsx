import { Navigate, Outlet } from "react-router-dom";

export const ProtectedProfileRoute = ({ user, redirectPath = '/' }: any) => {
  return(
    user ? <Outlet /> : <Navigate to={redirectPath} replace />
  );
};