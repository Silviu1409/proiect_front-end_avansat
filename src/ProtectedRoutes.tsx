import { Navigate, Outlet } from "react-router-dom";

export const ProtectedAuthRoute = ({ user, redirectPath = '/' }: any) => {
    return(user ? <Navigate to={redirectPath} replace /> : <Outlet />);
};

export const ProtectedProfileRoute = ({ user, redirectPath = '/' }: any) => {
    return(user ? <Outlet /> : <Navigate to={redirectPath} replace />);
};