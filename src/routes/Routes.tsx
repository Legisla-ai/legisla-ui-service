import { DefaultLayout } from '@/layouts/DefaultLayout';
import { NoHeaderLayout } from '@/layouts/NoHeaderLayout';
import Home from '@/pages/Home';
import JurisprudenceSearch from '@/pages/JurisprudenceSearch';
import Repository from '@/pages/Repository';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

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
        <Route
          path="/jurisprudencias"
          element={
            <ProtectedRoute>
              <JurisprudenceSearch />
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
