import api from './api';

// Tipo estendido para garantir compatibilidade com diferentes implementações de File
export interface ExtendedFile extends File {
  uid?: string;
  lastModifiedDate?: Date;
}

export interface AnalysisRequest {
  file: File | ExtendedFile;
  promptType: string;
}

export interface AnalysisResponse {
  analysisId?: string;
  result?: unknown;
  content?: string;
  analysis?: string;
  [key: string]: unknown;
}

export const analyzeDocument = async (request: AnalysisRequest): Promise<AnalysisResponse> => {
  // Validação de entrada para garantir qualidade dos dados
  if (!request.file || !(request.file instanceof File)) {
    throw new Error('Arquivo inválido ou não fornecido');
  }

  if (!request.promptType || typeof request.promptType !== 'string') {
    throw new Error('Tipo de prompt inválido ou não fornecido');
  }

  // Verificar se o arquivo tem conteúdo
  if (request.file.size === 0) {
    throw new Error('Arquivo vazio não pode ser analisado');
  }

  const formData = new FormData();
  
  // Garantir que o arquivo seja anexado corretamente
  formData.append('file', request.file, request.file.name);



  try {
    const response = await api.post<AnalysisResponse>(`/minerva/document/${request.promptType}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000, // 60 segundos
      // Upload progress tracking removed to eliminate unused code
    });


    
    return response.data;
  } catch (error: unknown) {
    console.error('Erro na requisição de análise:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      status: isAxiosError(error) ? error.response?.status : undefined,
      statusText: isAxiosError(error) ? error.response?.statusText : undefined,
      data: isAxiosError(error) ? error.response?.data : undefined,
      config: {
        url: isAxiosError(error) ? error.config?.url : undefined,
        method: isAxiosError(error) ? error.config?.method : undefined,
        headers: isAxiosError(error) ? error.config?.headers : undefined
      }
    });

    // Melhorar as mensagens de erro para o usuário
    if (isAxiosError(error) && error.response?.status === 400) {
      throw new Error('Formato de arquivo não suportado ou dados inválidos');
    } else if (isAxiosError(error) && error.response?.status === 413) {
      throw new Error('Arquivo muito grande. Tente um arquivo menor');
    } else if (isAxiosError(error) && error.response?.status === 500) {
      throw new Error('Erro interno do servidor. Tente novamente em alguns instantes');
    } else if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Tempo limite excedido. Tente novamente com um arquivo menor');
    }
    
    throw error;
  }
};

// Helper function to check if error is AxiosError
function isAxiosError(error: unknown): error is import('axios').AxiosError {
  return error !== null && typeof error === 'object' && 'response' in error;
}
