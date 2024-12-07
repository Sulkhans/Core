import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  return userInfo ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
