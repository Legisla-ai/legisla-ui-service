import api from './api';

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

export interface RepositoryAnalysisRequest {
  repositoryId: number;
  promptType: string;
}

const validateAnalysisRequest = (request: AnalysisRequest): void => {
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
};

const handleDocumentAnalysisError = (error: unknown): never => {
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
};

export const analyzeDocument = async (request: AnalysisRequest): Promise<AnalysisResponse> => {
  validateAnalysisRequest(request);
  const formData = new FormData();
  formData.append('file', request.file, request.file.name);

  try {
    const response = await api.post<AnalysisResponse>(`/document/${request.promptType}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000, // 60 segundos
    });

    return response.data;
  } catch (error: unknown) {
    return handleDocumentAnalysisError(error);
  }
};

function isAxiosError(error: unknown): error is import('axios').AxiosError {
  return error !== null && typeof error === 'object' && 'response' in error;
}

const validateRepositoryAnalysisRequest = (request: RepositoryAnalysisRequest): void => {
  if (!request.repositoryId || typeof request.repositoryId !== 'number' || request.repositoryId <= 0) {
    throw new Error('ID do repositório inválido ou não fornecido');
  }

  if (!request.promptType || typeof request.promptType !== 'string') {
    throw new Error('Tipo de prompt inválido ou não fornecido');
  }

  const supportedPromptTypes = ['summarize', 'riskAnalysis', 'fullAnalysis'];
  if (!supportedPromptTypes.includes(request.promptType)) {
    console.warn(`Tipo de prompt '${request.promptType}' pode não ser suportado pela API de repositório`);
  }
};

const handleRepositoryAnalysisError = (error: unknown): never => {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const errorCode = error.code;

    if (status === 404) {
      throw new Error('Repositório não encontrado ou não acessível');
    }

    if (status === 400) {
      throw new Error('Parâmetros de análise inválidos');
    }

    if (status === 422) {
      throw new Error('Documento não pode ser processado para este tipo de análise');
    }

    if (status === 500) {
      throw new Error('Erro interno do servidor. Tente novamente em alguns instantes');
    }

    if (errorCode === 'ECONNABORTED') {
      throw new Error('Timeout na análise do documento. Tente novamente');
    }

    if (errorCode === 'NETWORK_ERROR') {
      throw new Error('Erro de conexão. Verifique sua internet');
    }
  }

  throw new Error('Erro ao analisar documento do repositório. Tente novamente');
};

export const analyzeRepositoryDocument = async (request: RepositoryAnalysisRequest): Promise<AnalysisResponse> => {
  validateRepositoryAnalysisRequest(request);

  try {
    const response = await api.get<AnalysisResponse>(
      `/repository/${request.promptType}/${request.repositoryId}`,
      {
        timeout: 60000, // 60 segundos
      }
    );

    return response.data;
  } catch (error: unknown) {
    return handleRepositoryAnalysisError(error);
  }
};
