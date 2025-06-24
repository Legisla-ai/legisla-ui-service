import api from './api';
import { RepositoryChatHistoryResponse } from '@/interfaces/repositoryHistory';

export class RepositoryHistoryService {
    static async getRepositoryHistory(repositoryId: number): Promise<RepositoryChatHistoryResponse[]> {
        try {
            console.log(`[RepositoryHistoryService] Buscando histórico para repositório ${repositoryId}`);

            const response = await api.get<RepositoryChatHistoryResponse[]>(
                `/minerva/repository/history/${repositoryId}`
            );

            console.log(`[RepositoryHistoryService] Histórico carregado: ${response.data.length} itens`);
            return response.data;

        } catch (error: any) {
            // Error handling específico melhora a experiência do usuário
            if (error.response?.status === 404) {
                console.warn(`[RepositoryHistoryService] Repositório ${repositoryId} não encontrado`);
                throw new Error('Repositório não encontrado');
            }

            if (error.response?.status === 403) {
                console.warn(`[RepositoryHistoryService] Acesso negado ao repositório ${repositoryId}`);
                throw new Error('Acesso negado ao repositório');
            }

            if (error.code === 'NETWORK_ERROR') {
                console.error('[RepositoryHistoryService] Erro de rede');
                throw new Error('Erro de conexão. Verifique sua internet.');
            }

            console.error('[RepositoryHistoryService] Erro ao buscar histórico:', error);
            throw new Error('Erro interno. Tente novamente em alguns instantes.');
        }
    }

    static transformToDisplayFormat(historyData: RepositoryChatHistoryResponse[]) {
        return historyData.map(item => ({
            id: `${item.repositoryId}-${item.createdAt}`,
            title: this.extractTitle(item.message),
            date: this.formatRelativeDate(item.createdAt),
            starred: false,
            type: this.mapInteractionToFileType(item.interactionType),
            originalData: item
        }));
    }

    private static extractTitle(message: string, maxLength: number = 50): string {
        if (message.length <= maxLength) return message;

        const truncated = message.substring(0, maxLength);
        const lastSpace = truncated.lastIndexOf(' ');

        return lastSpace > maxLength * 0.7
            ? truncated.substring(0, lastSpace) + '...'
            : truncated + '...';
    }

    private static formatRelativeDate(dateString: string): string {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return 'Agora';
        if (diffInMinutes < 60) return `${diffInMinutes}m atrás`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h atrás`;
        if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d atrás`;

        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        });
    }

    private static mapInteractionToFileType(interactionType: string): 'chat' | 'pdf' | 'doc' | 'txt' {
        const lowerType = interactionType.toLowerCase();

        if (lowerType.includes('document') || lowerType.includes('pdf')) return 'pdf';
        if (lowerType.includes('analysis') || lowerType.includes('doc')) return 'doc';
        if (lowerType.includes('chat') || lowerType.includes('message')) return 'chat';

        return 'txt';
    }
}
