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
  result?: any;
  [key: string]: any;
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

  // Log detalhado para debugging
  console.log('Enviando requisição de análise:', {
    fileName: request.file.name,
    fileSize: request.file.size,
    fileType: request.file.type,
    promptType: request.promptType,
    endpoint: `/minerva/document/${request.promptType}`,
    formDataEntries: Array.from(formData.entries()).map(([key, value]) => ({
      key,
      valueType: typeof value,
      isFile: value instanceof File,
      fileName: value instanceof File ? value.name : null
    }))
  });

  try {
    const response = await api.post<AnalysisResponse>(`/minerva/document/${request.promptType}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000, // 60 segundos
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log('Progress do upload:', percentCompleted + '%');
        }
      },
    });

    console.log('Resposta da análise recebida:', {
      status: response.status,
      hasData: !!response.data,
      dataKeys: response.data ? Object.keys(response.data) : []
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Erro na requisição de análise:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });

    // Melhorar as mensagens de erro para o usuário
    if (error.response?.status === 400) {
      throw new Error('Formato de arquivo não suportado ou dados inválidos');
    } else if (error.response?.status === 413) {
      throw new Error('Arquivo muito grande. Tente um arquivo menor');
    } else if (error.response?.status === 500) {
      throw new Error('Erro interno do servidor. Tente novamente em alguns instantes');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Tempo limite excedido. Tente novamente com um arquivo menor');
    }
    
    throw error;
  }
};
