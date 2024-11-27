import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Arrow from "../../assets/arrow.svg?react";

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo } = useSelector((state: RootState) => state.user);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [activeSection, setActiveSection] = useState(
    location.pathname.split("/")[2]
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSection = (section: string) => {
    navigate(`/admin/${section}`);
    setActiveSection(section);
    setIsMobile(true);
  };

  const buttons = ["profile", "password", "users", "orders", "products"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[224px_1fr] sm:gap-x-4">
      <h1 className="col-span-2 mt-6 mb-3 pb-3 px-4 text-2xl font-semibold text-core-dark border-b-2 border-core-dark">
        {userInfo!.name}
      </h1>
      <aside
        className={`flex flex-col gap-2 font-medium text-lg text-core-main ${
          !isMobile && "hidden sm:flex"
        }`}
      >
        {buttons.map((button, i) => (
          <button
            key={i}
            onClick={() => handleSection(button)}
            className={`flex items-center justify-between py-2 px-4 rounded-md hover:text-core-dark hover:bg-core-white transition-colors ${
              !isMobile &&
              activeSection === button &&
              "text-core-dark font-semibold"
            }`}
          >
            {button.charAt(0).toUpperCase() + button.slice(1)}
            <span className="block sm:hidden">{<Arrow />}</span>
          </button>
        ))}
        <button className="py-2 px-4 rounded-md text-start hover:text-core-dark hover:bg-core-white transition-colors">
          Log out
        </button>
      </aside>
      <main className={`mt-2 ${isMobile && "hidden sm:block"}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
