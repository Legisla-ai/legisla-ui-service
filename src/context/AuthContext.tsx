// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchCurrentUser, logoutUser } from '@/services/authService';
import { LoginResponse } from '@/interfaces/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser?: LoginResponse;
  login: (loginResponse: LoginResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<LoginResponse | undefined>(undefined);
  const navigate = useNavigate();
  const location = useLocation();

  // Checa o status de autenticação consultando o backend
  useEffect(() => {
    const checkAuth = async () => {
      try {
        //const userData = await fetchCurrentUser(); // mudar isso quando tiver backend pra fazer autenticação
        setCurrentUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        setCurrentUser(undefined);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Redireciona para "/login" se a rota não for pública e o usuário não estiver autenticado
  useEffect(() => {
    const publicRoutes = ['/login', '/cadastro'];
    if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate, location.pathname]);

  // Após um login bem-sucedido (que já atualizou os cookies via authService)
  const login = (loginResponse: LoginResponse) => {
    setCurrentUser(loginResponse);
    setIsAuthenticated(true);
    navigate('/');
  };

  const logout = async () => {
    try {
      await logoutUser(); // Backend limpa os cookies
      setCurrentUser(undefined);
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
