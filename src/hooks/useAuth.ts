// src/hooks/useAuth.ts
import { LoginResponse, RegisterResponse, RegisterUser } from '@/interfaces/auth';
import { queryKeys } from '@/query/queryKeys';
import { loginUser, registerUser } from '@/services/authService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type AuthContext = {
  previousUserData: unknown;
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation<RegisterResponse, Error, RegisterUser, AuthContext>({
    mutationFn: (user: RegisterUser) => registerUser(user),
    onMutate: async (newUser: RegisterUser) => {
      // Cancela queries pendentes para a key de autenticação
      await queryClient.cancelQueries({ queryKey: queryKeys.auth() });
      // Captura o estado atual do cache para permitir rollback
      const previousUserData = queryClient.getQueryData(queryKeys.auth());
      // Atualização otimista: atualiza o cache com os dados do novo usuário
      queryClient.setQueryData(queryKeys.auth(), newUser);
      return { previousUserData };
    },
    onError: (error, _newUser, context) => {
      console.error('Erro ao registrar usuário:', error);
      // Se houver contexto de rollback, restaura o cache para o estado anterior
      if (context?.previousUserData) {
        queryClient.setQueryData(queryKeys.auth(), context.previousUserData);
      }
    },
    onSuccess: (data) => {
      console.log('Registro efetuado com sucesso!', data);
      // Atualiza o cache com a resposta completa do backend (token, etc.)
      queryClient.setQueryData(queryKeys.auth(), data);
      // Invalida a query para garantir que, se houver alguma outra dependência, seja feita uma refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.auth() });
    },
    onSettled: () => {
      console.log('Mutation de registro concluída.');
    },
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, { email: string; password: string }, AuthContext>({
    mutationFn: ({ email, password }) => loginUser(email, password),
    onMutate: async (credentials) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.auth() });
      const previousUserData = queryClient.getQueryData(queryKeys.auth());
      // Atualização otimista: atualiza o cache com um objeto parcial (p.ex.: somente o email)
      queryClient.setQueryData(queryKeys.auth(), { email: credentials.email });
      return { previousUserData };
    },
    onError: (error, _credentials, context) => {
      console.error('Erro ao fazer login:', error);
      // Reverte o cache para o estado anterior se necessário
      if (context?.previousUserData) {
        queryClient.setQueryData(queryKeys.auth(), context.previousUserData);
      }
    },
    onSuccess: (data) => {
      console.log('Login efetuado com sucesso!', data);
      // Atualiza o cache com os dados do usuário autenticado (tokens, etc.)
      queryClient.setQueryData(queryKeys.auth(), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.auth() });
    },
    onSettled: () => {
      console.log('Mutation de login concluída.');
    },
  });
};
