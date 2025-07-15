import api from './api';
import { LoginResponse, RegisterResponse, RegisterUser, User } from '@/interfaces/auth';

const normalizePhone = (phone: string): string => {
  const onlyDigits = phone.replace(/\D/g, '');
  if (onlyDigits.startsWith('55')) {
    return `+${onlyDigits}`;
  }
  return `+55${onlyDigits}`;
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', { email, password }, { withCredentials: true });
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
  const response = await api.post<RegisterResponse>('/auth/register', normalizedUser, { withCredentials: true });
  return response.data;
};

export const fetchCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>('/auth/user/details', { withCredentials: true });
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  try {
    await api.post('/auth/logout', {}, { withCredentials: true });
  } catch (err: unknown) {
    console.error('Erro ao fazer logout:', err);
    throw new Error('Erro ao fazer logout.');
  }
};
