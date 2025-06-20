import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { JSX } from 'react';

export default function ProtectedRoute({ children }: { readonly children: JSX.Element }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
