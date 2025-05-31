// src/hooks/useAuth.ts
import { useAuth } from '@/context/AuthContext';
import { LoginResponse, RegisterResponse, RegisterUser, User } from '@/interfaces/auth';
import { queryKeys } from '@/query/queryKeys';
import { loginUser, registerUser } from '@/services/authService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type AuthContextReturn = {
  previousUserData: unknown;
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();

  return useMutation<RegisterResponse, Error, RegisterUser, AuthContextReturn>({
    mutationFn: (user: RegisterUser) => registerUser(user),
    onMutate: async (newUser: RegisterUser) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.auth(),
      });
      const previousUserData = queryClient.getQueryData(queryKeys.auth());
      return { previousUserData };
    },
    onError: (error, _newUser, context) => {
      console.error('Erro ao registrar usuário:', error);
      if (context?.previousUserData) {
        queryClient.setQueryData(queryKeys.auth(), context.previousUserData);
      }
    },
    onSuccess: (data, variables) => {
      const userData: User = {
        id: '',
        name: variables.name,
        email: variables.email,
        phone: variables.phone,
        organizationName: variables.organizationName,
        numberOfEmployees: variables.numberOfEmployees,
      };
      login(data, userData);

      queryClient.setQueryData(queryKeys.auth(), {
        ...data,
        user: userData,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.auth(),
      });
    },
    onSettled: () => { },
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();

  return useMutation<LoginResponse, Error, { email: string; password: string }, AuthContextReturn>({
    mutationFn: ({ email, password }) => loginUser(email, password),
    onMutate: async (credentials) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.auth(),
      });
      const previousUserData = queryClient.getQueryData(queryKeys.auth());
      return { previousUserData };
    },
    onError: (error, _credentials, context) => {
      console.error('Erro ao fazer login:', error);
      if (context?.previousUserData) {
        queryClient.setQueryData(queryKeys.auth(), context.previousUserData);
      }
    },
    onSuccess: (data) => {
      login(data);
      queryClient.setQueryData(queryKeys.auth(), data);
      queryClient.invalidateQueries({
        queryKey: queryKeys.auth(),
      });
    },
    onSettled: () => {
    },
  });
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  return useMutation<void, Error, void>({
    mutationFn: () => {
      return import('@/services/authService').then((mod) => mod.logoutUser());
    },
    onSuccess: () => {
      logout();
      queryClient.removeQueries({
        queryKey: queryKeys.auth(),
      });
      queryClient.clear();
    },
    onError: (error) => {
      console.error('Erro ao fazer logout:', error);
      logout();
      queryClient.removeQueries({
        queryKey: queryKeys.auth(),
      });
    },
  });
};
