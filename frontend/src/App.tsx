import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader.tsx";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import ProfileLayout from "./pages/ProfileLayout.tsx";
import Profile from "./pages/Profile.tsx";
import Password from "./pages/Password.tsx";

const AdminRoute = lazy(() => import("./pages/AdminRoute.tsx"));
const PrivateRoute = lazy(() => import("./pages/PrivateRoute.tsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route element={<PrivateRoute />}>
                <Route
                  path="user"
                  element={
                    <ProfileLayout
                      sections={["profile", "password", "orders"]}
                    />
                  }
                >
                  <Route path="profile" element={<Profile />} />
                  <Route path="password" element={<Password />} />
                </Route>
              </Route>
              <Route element={<AdminRoute />}>
                <Route
                  path="admin"
                  element={
                    <ProfileLayout
                      sections={[
                        "profile",
                        "password",
                        "users",
                        "orders",
                        "products",
                      ]}
                    />
                  }
                >
                  <Route path="profile" element={<Profile />} />
                  <Route path="password" element={<Password />} />
                </Route>
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
