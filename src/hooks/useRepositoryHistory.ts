import { useQuery, useQueryClient, UseQueryOptions, useMutation } from '@tanstack/react-query';
import { RepositoryHistoryService } from '@/services/repositoryHistoryService';
import { RepositoryResponse, DocumentItem, RepositoryChatHistoryResponse } from '@/interfaces/repositoryHistory';
import type { ChatMessageType } from '@/interfaces/chat';
import { queryKeys } from '@/query/queryKeys';

// Options interface for repository history hook
type UseRepositoryHistoryOptions = Omit<
  UseQueryOptions<RepositoryResponse[], Error, DocumentItem[]>,
  'queryKey' | 'queryFn' | 'select'
>;

interface UseRepositoryChatHistoryOptions
  extends Omit<
    UseQueryOptions<RepositoryChatHistoryResponse[], Error, ChatMessageType[]>,
    'queryKey' | 'queryFn' | 'select'
  > {
  repositoryId: number | null;
}

export function useRepositoryHistory(options: UseRepositoryHistoryOptions = {}) {
  return useQuery({
    queryKey: queryKeys.repositoryHistory(null),
    queryFn: async () => {
      return await RepositoryHistoryService.getRepositoryHistory();
    },
    select: (data: RepositoryResponse[]) => {
      return RepositoryHistoryService.transformToDisplayFormat(data);
    },

    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: (failureCount, error) => {
      if (
        error.message.includes('Sessão expirada') ||
        error.message.includes('Acesso negado') ||
        error.message.includes('não autorizado')
      ) {
        return false;
      }

      return failureCount < 3;
    },
    ...options,
  });
}

export function useInvalidateRepositoryHistory() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.repositoryHistory(null),
    });
  };
}

export function usePrefetchRepositoryHistory() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.repositoryHistory(null),
      queryFn: async () => {
        return await RepositoryHistoryService.getRepositoryHistory();
      },
      staleTime: 2 * 60 * 1000,
    });
  };
}

/**
 * Hook para buscar histórico de chat de um repositório específico
 *
 * **Funcionalidade:**
 * - Busca mensagens do chat do repositório
 * - Transforma automaticamente para formato ChatMessageType
 * - Integração com sistema de cache do React Query
 * - Desabilitado quando repositoryId é null
 */
export function useRepositoryChatHistory({ repositoryId, ...options }: UseRepositoryChatHistoryOptions) {
  return useQuery({
    queryKey: queryKeys.repositoryChatHistory(repositoryId),
    queryFn: async () => {
      if (!repositoryId) {
        throw new Error('Repository ID é obrigatório para buscar histórico de chat');
      }
      return await RepositoryHistoryService.getRepositoryChatHistory(repositoryId);
    },
    select: (data: RepositoryChatHistoryResponse[]) => {
      return RepositoryHistoryService.transformChatHistoryToMessages(data);
    },
    enabled: !!repositoryId, // Só executa se repositoryId existir
    staleTime: 5 * 60 * 1000, // Chat pode ficar stale por mais tempo
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false, // Chat não precisa refetch no focus
    refetchOnReconnect: true,
    retry: (failureCount, error) => {
      if (
        error.message.includes('Sessão expirada') ||
        error.message.includes('Acesso negado') ||
        error.message.includes('não autorizado')
      ) {
        return false;
      }

      return failureCount < 2; // Menos tentativas para chat
    },
    ...options,
  });
}

/**
 * Hook para invalidar cache do histórico de chat
 */
export function useInvalidateRepositoryChatHistory() {
  const queryClient = useQueryClient();

  return (repositoryId: number | null = null) => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.repositoryChatHistory(repositoryId),
    });
  };
}

/**
 * Hook para fazer prefetch do histórico de chat
 */
export function usePrefetchRepositoryChatHistory() {
  const queryClient = useQueryClient();

  return (repositoryId: number) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.repositoryChatHistory(repositoryId),
      queryFn: async () => {
        return await RepositoryHistoryService.getRepositoryChatHistory(repositoryId);
      },
      staleTime: 5 * 60 * 1000,
    });
  };
}

/**
 * Hook para deletar um repositório
 *
 * **Funcionalidade:**
 * - Deleta um repositório pelo ID
 * - Invalida cache automaticamente após sucesso
 * - Tratamento de erros específicos para deleção
 * - Feedback visual integrado
 */
export function useDeleteRepository() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (repositoryId: number) => {
      return await RepositoryHistoryService.deleteRepository(repositoryId);
    },
    onSuccess: (_, repositoryId) => {
      // Invalida o cache do histórico para atualizar a lista
      queryClient.invalidateQueries({
        queryKey: queryKeys.repositoryHistory(null),
      });

      // Remove específicamente o cache do chat deste repositório
      queryClient.removeQueries({
        queryKey: queryKeys.repositoryChatHistory(repositoryId),
      });
    },
    onError: (error, repositoryId) => {
      console.error(`[useDeleteRepository] Erro ao deletar repositório ${repositoryId}:`, error);
    },
    // Configurações para retry em caso de erro de rede
    retry: (failureCount, error) => {
      // Não faz retry para erros de autorização ou recurso não encontrado
      if (
        error.message.includes('Acesso negado') ||
        error.message.includes('não encontrado') ||
        error.message.includes('já foi excluído')
      ) {
        return false;
      }
      return failureCount < 2;
    },
  });
}
