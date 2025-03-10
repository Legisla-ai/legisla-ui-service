// src/services/authService.ts
import { LoginResponse, RegisterResponse, RegisterUser } from '@/interfaces/auth';
import Cookies from 'js-cookie';
import api from './api';

const LOGIN_URL = '/persona/auth/login';
const REGISTER_URL = '/persona/auth/register';

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(LOGIN_URL, { email, password });
    Cookies.set('accessToken', response.data.accessToken, { secure: true, sameSite: 'strict' });
    return response.data;
  } catch (error: unknown) {
    console.error('Erro ao fazer login:', error);
    throw new Error('Credenciais inválidas. Tente novamente.');
  }
};

export const registerUser = async (user: RegisterUser): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>(REGISTER_URL, user);
    Cookies.set('accessToken', response.data.accessToken, { secure: true, sameSite: 'strict' });
    return response.data;
  } catch (error: unknown) {
    console.error('Erro ao registrar usuário:', error);
    throw new Error('Erro no registro. Tente novamente.');
  }
};
