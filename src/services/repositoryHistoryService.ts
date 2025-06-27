import api from './api';
import { RepositoryResponse, RepositoryChatHistoryResponse } from '@/interfaces/repositoryHistory';
import type { ChatMessageType } from '@/interfaces/chat';

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
    return repositories.map((repo) => ({
      id: repo.id.toString(),
      title: repo.name || `Documento ${repo.documentId}`,
      date: this.formatRelativeDate(repo.createdAt),
      type: this.getFileType(repo.name),
      originalData: repo,
    }));
  }

  static transformChatHistoryToMessages(chatHistory: RepositoryChatHistoryResponse[]): ChatMessageType[] {
    return chatHistory
      .map((item) => ({
        id: `${item.repositoryId}-${item.createdAt}-${Math.random().toString(36).substring(2, 11)}`,
        content: item.message,
        isUser: item.sender.toLowerCase() === 'user',
        timestamp: new Date(item.createdAt),
      }))
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()); // Ordena por timestamp crescente
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
    const normalizedDateString =
      dateString.includes('Z') ||
      dateString.includes('+') ||
      (dateString.includes('T') && dateString.split('T')[1].includes('-'))
        ? dateString
        : `${dateString}Z`;

    const date = new Date(normalizedDateString);

    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }

    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInMinutes < 1 || diffInMinutes < 0) return 'Agora';
    if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h atrás`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d atrás`;

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static onRepositoryCreated(_repositoryData: { id: number; name?: string }): void {
    // Hook para futura implementação de notificações ou cache invalidation
  }

  static async checkForDuplicateFile(
    file: File
  ): Promise<{ isDuplicate: boolean; existingRepository?: RepositoryResponse; suggestion?: string }> {
    try {
      const repositories = await this.getRepositoryHistory();

      const fileName = file.name.toLowerCase().trim();

      // Procura por arquivos com nome idêntico ou muito similar
      const exactNameMatch = repositories.find((repo) => repo.name?.toLowerCase().trim() === fileName);

      if (exactNameMatch) {
        return {
          isDuplicate: true,
          existingRepository: exactNameMatch,
          suggestion: `Você já enviou um arquivo chamado "${file.name}" em ${this.formatRelativeDate(exactNameMatch.createdAt)}.`,
        };
      }

      const baseFileName = fileName.replace(/\.[^/.]+$/, '');
      const similarNameMatch = repositories.find((repo) => {
        if (!repo.name) return false;
        const repoBaseName = repo.name
          .toLowerCase()
          .trim()
          .replace(/\.[^/.]+$/, '');
        return repoBaseName === baseFileName && repoBaseName.length > 3;
      });

      if (similarNameMatch) {
        return {
          isDuplicate: true,
          existingRepository: similarNameMatch,
          suggestion: `Encontramos um arquivo similar "${similarNameMatch.name}" que você enviou em ${this.formatRelativeDate(similarNameMatch.createdAt)}.`,
        };
      }

      return { isDuplicate: false };
    } catch (error) {
      console.warn('[RepositoryHistoryService] Erro ao verificar duplicatas:', error);
      return { isDuplicate: false };
    }
  }
}
