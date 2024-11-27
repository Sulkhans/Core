import User from "../assets/user.svg?react";
import Cart from "../assets/cart.svg?react";
import Menu from "../assets/menu.svg?react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

type Props = {
  openAuthModal: () => void;
};

const Header = ({ openAuthModal }: Props) => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const navigateTo = () =>
    userInfo!.isAdmin ? navigate("/admin/profile") : navigate("/user/profile");

  return (
    <header>
      <div className="w-full max-w-7xl h-16 content-center mx-auto">
        <div className="px-4 sm:px-6 flex items-center justify-between">
          <div className="flex gap-4">
            <button>
              <Menu className="stroke-core-main hover:stroke-core-dark transition-colors" />
            </button>
            <h1
              onClick={() => navigate("/")}
              className="text-[26px] font-semibold text-core-main select-none cursor-pointer"
            >
              <span className="text-core-dark">CO</span>RE
            </h1>
          </div>
          <div className="flex gap-4">
            <button>
              <Cart className="stroke-core-main hover:stroke-core-dark transition-colors" />
            </button>
            <button onClick={userInfo ? navigateTo : openAuthModal}>
              <User className="stroke-core-main hover:stroke-core-dark transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
