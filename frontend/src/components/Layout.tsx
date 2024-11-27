import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AuthModal from "./auth/AuthModal";

const Layout = () => {
  const [authModal, setAuthModal] = useState(false);
  const openAuthModal = () => setAuthModal(true);
  const closeAuthModal = () => setAuthModal(false);

  return (
    <>
      <Header openAuthModal={openAuthModal} />
      <AuthModal isOpen={authModal} close={closeAuthModal} />
      <div className="max-w-7xl content-center mx-auto">
        <div className="px-4 sm:px-6">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
