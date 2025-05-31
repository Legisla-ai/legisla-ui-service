// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, LoginResponse } from '@/interfaces/auth';
import { fetchCurrentUser } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  tokens: {
    accessToken: string;
    refreshToken: string;
    idToken: string;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (response: LoginResponse, userData?: User) => void;
  logout: () => void;
  updateTokens: (tokens: { accessToken: string; refreshToken: string; idToken: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_STORAGE_KEY = 'auth_tokens';
const USER_STORAGE_KEY = 'auth_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthContextType['tokens']>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedTokens = localStorage.getItem(TOKEN_STORAGE_KEY);
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedTokens) {
        setTokens(JSON.parse(storedTokens));
      }
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Erro ao carregar dados de autenticação:', err);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const verifyAuth = async () => {
      if (tokens?.accessToken && !user) {
        try {
          const currentUser = await fetchCurrentUser();
          setUser(currentUser);
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
        } catch (e) {
          console.error('Token inválido, fazendo logout:', e);
          logout();
        }
      }
    };
    if (!isLoading && tokens) {
      verifyAuth();
    }
  }, [tokens, user, isLoading]);

  const login = (response: LoginResponse, userData?: User) => {
    const newTokens = {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      idToken: response.idToken,
    };
    setTokens(newTokens);
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(newTokens));

    if (userData) {
      setUser(userData);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  const updateTokens = (newTokens: { accessToken: string; refreshToken: string; idToken: string }) => {
    setTokens(newTokens);
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(newTokens));
  };

  const isAuthenticated = !!tokens?.accessToken && !!user;

  const value: AuthContextType = {
    user,
    tokens,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateTokens,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
