import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminRoute;
