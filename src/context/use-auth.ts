import { useContext } from 'react';
import { AuthContext } from './auth-context';
import type { AuthContextType } from '@/interfaces/auth';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
