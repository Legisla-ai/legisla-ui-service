import { DefaultLayout } from '@/layouts/DefaultLayout';
import { NoHeaderLayout } from '@/layouts/NoHeaderLayout';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ProtectedRoute from './ProtectedRoute';

// Lazy loading dos componentes principais
const Home = lazy(() => import('@/pages/Home'));
const Repository = lazy(() => import('@/pages/Repository'));
const CompleteAnalysis = lazy(() => import('@/pages/CompleteAnalysis'));
const RiskAnalysis = lazy(() => import('@/pages/RiskAnalysis'));
const JurisprudenceSearch = lazy(() => import('@/pages/JurisprudenceSearch'));
const SignIn = lazy(() => import('@/pages/SignIn'));
const SignUp = lazy(() => import('@/pages/SignUp'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/40">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-legisla-turquoise-2/30 border-t-legisla-turquoise-2 rounded-full animate-spin"></div>
      <p className="text-sm text-gray-600 font-medium">Carregando página...</p>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
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
            path="/analise-completa"
            element={
              <ProtectedRoute>
                <CompleteAnalysis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analise-riscos"
            element={
              <ProtectedRoute>
                <RiskAnalysis />
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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
