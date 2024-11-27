import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Loader from "./components/Loader.tsx";
import Layout from "./components/Layout.tsx";
import PrivateRoute from "./pages/PrivateRoute.tsx";
import AdminRoute from "./pages/Admin/AdminRoute.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Home from "./pages/Home.tsx";
import User from "./pages/User/User.tsx";
import Admin from "./pages/Admin/Admin.tsx";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route element={<PrivateRoute />}>
                <Route path="user" element={<User />} />
              </Route>
              <Route element={<AdminRoute />}>
                <Route path="admin" element={<Admin />}></Route>
              </Route>
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
