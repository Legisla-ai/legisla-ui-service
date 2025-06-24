import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { RepositoryHistoryService } from '@/services/repositoryHistoryService';
import { RepositoryChatHistoryResponse, DocumentItem } from '@/interfaces/repositoryHistory';
import { queryKeys } from '@/query/queryKeys';

interface UseRepositoryHistoryOptions extends Omit<UseQueryOptions<RepositoryChatHistoryResponse[], Error, DocumentItem[]>, 'queryKey' | 'queryFn' | 'select'> {
    readonly repositoryId: number | null;
}

export function useRepositoryHistory(options: UseRepositoryHistoryOptions) {
    const { repositoryId, ...queryOptions } = options;

    return useQuery({
        queryKey: queryKeys.repositoryHistory(repositoryId),
        queryFn: async () => {
            if (!repositoryId) {
                throw new Error('Repository ID é obrigatório');
            }

            return await RepositoryHistoryService.getRepositoryHistory(repositoryId);
        },
        select: (data: RepositoryChatHistoryResponse[]) => {
            return RepositoryHistoryService.transformToDisplayFormat(data);
        },

        enabled: repositoryId !== null && repositoryId !== undefined,
        staleTime: 2 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: (failureCount, error) => {
            if (error.message.includes('não encontrado') || error.message.includes('Acesso negado')) {
                return false;
            }

            return failureCount < 3;
        },
        ...queryOptions,
    });
}

export function useInvalidateRepositoryHistory() {
    const queryClient = useQueryClient();

    return (repositoryId?: number) => {
        if (repositoryId) {
            queryClient.invalidateQueries({
                queryKey: queryKeys.repositoryHistory(repositoryId)
            });
        } else {
            queryClient.invalidateQueries({
                queryKey: queryKeys.repositoryHistory(null)
            });
        }
    };
}

export function usePrefetchRepositoryHistory() {
    const queryClient = useQueryClient();

    return (repositoryId: number) => {
        queryClient.prefetchQuery({
            queryKey: queryKeys.repositoryHistory(repositoryId),
            queryFn: async () => {
                const historyData = await RepositoryHistoryService.getRepositoryHistory(repositoryId);
                return RepositoryHistoryService.transformToDisplayFormat(historyData);
            },
            staleTime: 2 * 60 * 1000,
        });
    };
}
