import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useLogoutMutation } from "../redux/api/usersApiSlice";
import { clearUser } from "../redux/slices/userSlice";
import { Transition } from "@headlessui/react";
import Arrow from "../assets/arrow.svg?react";

type Props = {
  sections: string[];
};

const ProfileLayout = ({ sections }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [logout, { isLoading }] = useLogoutMutation();

  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 640);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [activeSection, setActiveSection] = useState(
    location.pathname.split("/")[2]
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsMobileView(true);
        setIsSidebarVisible(true);
      } else {
        setIsMobileView(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSection = (section: string) => {
    navigate(`/${location.pathname.split("/")[1]}/${section}`);
    setActiveSection(section);
    setIsSidebarVisible(false);
  };

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      dispatch(clearUser());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <>
      {isMobileView && !isSidebarVisible ? (
        <button
          onClick={() => setIsSidebarVisible(true)}
          className="my-4 flex items-center text-2xl font-semibold text-core-main hover:text-core-dark active:text-core-dark transition-colors"
        >
          <Arrow className="rotate-180" />
          <span className="px-4">{capitalize(activeSection)}</span>
        </button>
      ) : (
        <h1 className="my-4 px-4 text-2xl font-semibold text-core-main">
          {userInfo?.name}
        </h1>
      )}
      <hr className="border border-core-main rounded-full mb-4" />
      <div className="relative grid grid-cols-1 sm:grid-cols-[224px_1fr] sm:gap-x-4 lg:gap-x-10">
        <Transition
          show={isMobileView ? isSidebarVisible : true}
          enter="ease-in duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="ease-in duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <aside className="absolute sm:static w-full flex flex-col gap-2 font-medium text-lg text-core-main bg-white z-30">
            {sections.map((section, i) => (
              <button
                key={i}
                onClick={() => handleSection(section)}
                className={`flex items-center justify-between py-2 px-4 rounded-md hover:text-core-dark hover:bg-core-white transition-colors ${
                  !isMobileView &&
                  activeSection === section &&
                  "text-core-dark font-semibold"
                }`}
              >
                {capitalize(section)}
                <span className="block sm:hidden">{<Arrow />}</span>
              </button>
            ))}
            <button
              disabled={isLoading}
              onClick={handleLogout}
              className="py-2 px-4 rounded-md text-start hover:text-core-dark hover:bg-core-white transition-colors"
            >
              Log out
            </button>
          </aside>
        </Transition>
        <main className="mt-2 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default ProfileLayout;
