import { Link } from "react-router-dom";
import Phone from "../assets/categories/phone.svg?react";
import Tablet from "../assets/categories/tablet.svg?react";
import Laptop from "../assets/categories/laptop.svg?react";
import Monitor from "../assets/categories/monitor.svg?react";
import TV from "../assets/categories/tv.svg?react";
import Console from "../assets/categories/console.svg?react";
import Headphones from "../assets/categories/headphones.svg?react";

type Props = {
  close: () => void;
};

const Navigation = ({ close }: Props) => {
  const style =
    "flex items-center py-3 px-4 hover:bg-slate-200 transition-colors duration-300 *:inline *:mr-4";
  return (
    <nav className="absolute top-11 z-40 shadow-md overflow-hidden flex flex-col !mt-5 bg-core-white text-core-main rounded-xl font-medium">
      {[
        { to: "/phones", icon: <Phone />, text: "Phones" },
        { to: "/tabs", icon: <Tablet />, text: "Tabs" },
        { to: "/laptops", icon: <Laptop />, text: "Laptops" },
        { to: "/monitors", icon: <Monitor />, text: "Monitors" },
        { to: "/tvs", icon: <TV />, text: "Television" },
        { to: "/consoles", icon: <Console />, text: "Consoles" },
        { to: "/headphones", icon: <Headphones />, text: "Headphones" },
      ].map(({ to, icon, text }) => (
        <Link key={to} to={"/category" + to} className={style} onClick={close}>
          {icon}
          {text}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
