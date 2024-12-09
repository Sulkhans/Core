import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import AuthModal from "./auth/AuthModal";
import Footer from "./Footer";

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
      <ToastContainer
        theme="colored"
        position="bottom-right"
        autoClose={5000}
        closeButton={false}
        closeOnClick={true}
        transition={Slide}
      />
      <Footer />
    </>
  );
};

export default Layout;
