import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/CakePage/CakePage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ResourcesPage from "./pages/ResourcesPage/ResourcesPage"; 
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import NotFound from "./pages/NotFound/NotFound";
import AdminPage from "./pages/AdminPage/AdminPage";

import Layout from "./components/Layout/Layout";
import Refresher from "./components/Refresher/Refresher";

import { refreshThunk } from "./redux/authOperations";
import { selectIsRefreshing } from "./redux/authSlice";

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return isRefreshing ? (
    <Refresher />
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="register"
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          }
        />
        <Route
          path="login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
        <Route path="resources" element={<ResourcesPage />} />{" "}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
