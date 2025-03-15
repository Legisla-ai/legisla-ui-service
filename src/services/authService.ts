// src/services/authService.ts
import { LoginResponse, RegisterResponse, RegisterUser } from '@/interfaces/auth';
import api from './api';

const LOGIN_URL = '/persona/auth/login';
const REGISTER_URL = '/persona/auth/register';

const normalizePhone = (phone: string): string => {
  return phone.startsWith('+55') ? phone : `+55${phone}`;
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(LOGIN_URL, { email, password }, { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    console.error('Erro ao fazer login:', error);
    throw new Error('Credenciais inválidas. Tente novamente.');
  }
};

export const registerUser = async (user: RegisterUser): Promise<RegisterResponse> => {
  const normalizedUser: RegisterUser = {
    ...user,
    phone: normalizePhone(user.phone),
  };

  const response = await api.post<RegisterResponse>(REGISTER_URL, normalizedUser, { withCredentials: true });
  return response.data;
};

export const fetchCurrentUser = async (): Promise<LoginResponse> => {
  const response = await api.get<LoginResponse>('/persona/auth/me', { withCredentials: true });
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  try {
    await api.post('/persona/auth/logout', {}, { withCredentials: true });
  } catch (error: unknown) {
    console.error('Erro ao fazer logout:', error);
    throw new Error('Erro ao fazer logout.');
  }
};
