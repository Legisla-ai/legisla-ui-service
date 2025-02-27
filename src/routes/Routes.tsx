import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { NoHeaderLayout } from "@/layouts/NoHeaderLayout";
import Home from "@/pages/Home";
import Repository from "@/pages/Repository";
import SignUp from "@/pages/SignUp";
import SignIn from "@/pages/SignIn";
import ProtectedRoute from "@/components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/repositorio"
          element={
            <ProtectedRoute>
              <Repository />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route element={<NoHeaderLayout />}>
        <Route path="/cadastro" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;