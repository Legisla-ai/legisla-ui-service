import api from './api';
import { RepositoryResponse, RepositoryChatHistoryResponse } from '@/interfaces/repositoryHistory';
import type { ChatMessageType } from '@/components/ChatArea/types';

export class RepositoryHistoryService {
    static async getRepositoryHistory(): Promise<RepositoryResponse[]> {
        const response = await api.get<RepositoryResponse[]>('/minerva/repository');
        return response.data;
    }

    static async getRepositoryChatHistory(repositoryId: number): Promise<RepositoryChatHistoryResponse[]> {
        const response = await api.get<RepositoryChatHistoryResponse[]>(`/minerva/repository/history/${repositoryId}`);
        return response.data;
    }

    static async deleteRepository(repositoryId: number): Promise<void> {
        await api.delete(`/minerva/repository/${repositoryId}`);
    }

    static transformToDisplayFormat(repositories: RepositoryResponse[]) {
        return repositories.map(repo => ({
            id: repo.id.toString(),
            title: repo.name || `Documento ${repo.documentId}`,
            date: this.formatRelativeDate(repo.createdAt),
            type: this.getFileType(repo.name),
            originalData: repo
        }));
    }

    static transformChatHistoryToMessages(chatHistory: RepositoryChatHistoryResponse[]): ChatMessageType[] {
        return chatHistory.map(item => ({
            id: `${item.repositoryId}-${item.createdAt}-${Math.random().toString(36).substring(2, 11)}`,
            content: item.message,
            isUser: item.sender.toLowerCase() === 'user',
            timestamp: new Date(item.createdAt)
        }));
    }

    private static getFileType(name: string): 'chat' | 'pdf' | 'doc' | 'txt' {
        if (!name) return 'txt';

        const lowerName = name.toLowerCase();
        if (/\.pdf|pdf/.test(lowerName)) return 'pdf';
        if (/\.docx?|word/.test(lowerName)) return 'doc';
        if (/chat|conversa/.test(lowerName)) return 'chat';
        return 'txt';
    }

    private static formatRelativeDate(dateString: string): string {
        const date = new Date(dateString);
        
        if (isNaN(date.getTime())) {
            return 'Data inválida';
        }

        const diffInMinutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));

        if (diffInMinutes <= 0) return 'Agora';
        if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h atrás`;
        if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d atrás`;

        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        });
    }
}
