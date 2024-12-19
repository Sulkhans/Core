import User from "../assets/user.svg?react";
import Cart from "../assets/cart.svg?react";
import Menu from "../assets/menu.svg?react";
import Heart from "../assets/heart.svg?react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

type Props = {
  openAuthModal: () => void;
};

const Header = ({ openAuthModal }: Props) => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const navigateTo = () =>
    userInfo!.isAdmin ? navigate("/admin/profile") : navigate("/user/profile");

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="mb-2">
      <div className="w-full max-w-7xl h-28 sm:h-16 content-center space-y-2 px-4 sm:px-6 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <button>
              <Menu className="stroke-core-main hover:stroke-core-dark transition-colors" />
            </button>
            <h1
              onClick={() => navigate("/")}
              className="text-3xl font-sintony font-semibold text-core-main select-none cursor-pointer"
            >
              CORE
            </h1>
          </div>
          {width >= 640 && <SearchBar />}
          <div className="flex gap-4">
            <button>
              <Heart className="stroke-core-main hover:stroke-core-dark transition-colors" />
            </button>
            <button>
              <Cart className="stroke-core-main hover:stroke-core-dark transition-colors" />
            </button>
            <button onClick={userInfo ? navigateTo : openAuthModal}>
              <User className="stroke-core-main hover:stroke-core-dark transition-colors" />
            </button>
          </div>
        </div>
        {width < 640 && <SearchBar />}
      </div>
    </header>
  );
};

export default Header;
