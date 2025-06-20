// src/services/authService.ts
import api from './api';
import { User } from '@/interfaces/auth';
import { LoginResponse, RegisterResponse, RegisterUser } from '@/interfaces/auth';

const LOGIN_URL = '/persona/auth/login';
const REGISTER_URL = '/persona/auth/register';
const ME_URL = '/persona/user/details';

const normalizePhone = (phone: string): string => {
  const onlyDigits = phone.replace(/\D/g, '');
  if (onlyDigits.startsWith('55')) {
    return `+${onlyDigits}`;
  }
  return `+55${onlyDigits}`;
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(LOGIN_URL, { email, password }, { withCredentials: true });
    return response.data;
  } catch (err: unknown) {
    console.error('Erro ao fazer login:', err);
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

export const fetchCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>(ME_URL, { withCredentials: true });
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  try {
    await api.post('/persona/auth/logout', {}, { withCredentials: true });
  } catch (err: unknown) {
    console.error('Erro ao fazer logout:', err);
    throw new Error('Erro ao fazer logout.');
  }
};
