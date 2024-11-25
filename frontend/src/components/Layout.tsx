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
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
