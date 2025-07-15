import api from './api';

export interface CreateRepositoryRequest {
  file: string;
}

export interface CreateRepositoryResponse {
  id: number;
  name?: string;
  createdAt?: string;
  status?: 'created' | 'processing' | 'ready';
  [key: string]: unknown;
}

export class RepositoryService {
  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10mb
  private static readonly UPLOAD_TIMEOUT = 60000; // 60 segundos

  private static validateFile(file: File): void {
    if (!file || !(file instanceof File)) {
      throw new Error('Arquivo inválido ou não fornecido');
    }

    if (file.size === 0) {
      throw new Error('Arquivo vazio não pode ser usado para criar repositório');
    }

    if (file.size > this.MAX_FILE_SIZE) {
      throw new Error('Arquivo muito grande. Tamanho máximo permitido: 10MB');
    }
  }

  private static handleApiError(error: unknown): never {
    console.error('Erro ao criar repositório:', error);

    // Type guard para axios error
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number }; code?: string };

      if (axiosError.response?.status === 400) {
        throw new Error('Arquivo inválido ou formato não suportado');
      }

      if (axiosError.response?.status === 413) {
        throw new Error('Arquivo muito grande. Limite máximo excedido');
      }

      if (axiosError.response?.status === 422) {
        throw new Error('Dados do arquivo não puderam ser processados');
      }

      if (axiosError.response?.status === 500) {
        throw new Error('Erro interno do servidor. Tente novamente em alguns instantes');
      }

      if (axiosError.code === 'NETWORK_ERROR') {
        throw new Error('Erro de conexão. Verifique sua internet');
      }

      if (axiosError.code === 'ECONNABORTED') {
        throw new Error('Timeout na criação do repositório. Tente novamente');
      }
    }

    throw new Error('Erro ao criar repositório. Tente novamente');
  }

  static async createRepository(file: File): Promise<CreateRepositoryResponse> {
    this.validateFile(file);

    try {
      const formData = new FormData();
      formData.append('file', file, file.name);

      const response = await api.post<CreateRepositoryResponse>('/repository', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: this.UPLOAD_TIMEOUT,
      });

      return response.data;
    } catch (error: unknown) {
      this.handleApiError(error);
    }
  }

  static async fileToBase64(file: File): Promise<string> {
    if (!file || !(file instanceof File)) {
      throw new Error('Arquivo inválido fornecido para conversão');
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1] || result;
        resolve(base64);
      };
      reader.onerror = () => {
        reject(new Error('Erro ao ler arquivo para conversão base64'));
      };
    });
  }
}
