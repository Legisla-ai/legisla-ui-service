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

/**
 * Trata erros específicos da API de análise de documento
 * 
 * **Benefícios:**
 * - Centralização do tratamento de erros
 * - Mensagens user-friendly específicas por contexto
 * - Facilita manutenção e testes
 */
const handleDocumentAnalysisError = (error: unknown): never => {
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
};

export const analyzeDocument = async (request: AnalysisRequest): Promise<AnalysisResponse> => {
  // Validação de entrada delegada para função específica
  validateAnalysisRequest(request);

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
    // Tratamento de erro delegado para função específica
    return handleDocumentAnalysisError(error);
  }
};

// Helper function to check if error is AxiosError
function isAxiosError(error: unknown): error is import('axios').AxiosError {
  return error !== null && typeof error === 'object' && 'response' in error;
}

/**
 * Valida os parâmetros de entrada para análise de repositório
 * 
 * **Benefícios:**
 * - Separação de responsabilidades (SRP) 
 * - Redução da complexidade cognitiva
 * - Reutilização de código
 * - Melhores mensagens de erro
 */
const validateRepositoryAnalysisRequest = (request: RepositoryAnalysisRequest): void => {
  if (!request.repositoryId || typeof request.repositoryId !== 'number' || request.repositoryId <= 0) {
    throw new Error('ID do repositório inválido ou não fornecido');
  }

  if (!request.promptType || typeof request.promptType !== 'string') {
    throw new Error('Tipo de prompt inválido ou não fornecido');
  }

  // **Validação adicional**: Garantir que seguimos a API documentada
  // Atualmente a API suporta apenas 'summarize' para repositórios existentes
  // Esta validação pode ser removida quando outras operações forem suportadas
  const supportedPromptTypes = ['summarize', 'riskAnalysis', 'fullAnalysis'];
  if (!supportedPromptTypes.includes(request.promptType)) {
    console.warn(`Tipo de prompt '${request.promptType}' pode não ser suportado pela API de repositório`);
  }
};

/**
 * Trata erros específicos da API de repositório
 * 
 * **Benefícios:**
 * - Centralizaçao do tratamento de erros
 * - Mensagens user-friendly específicas por contexto
 * - Facilita manutenção e testes
 */
const handleRepositoryAnalysisError = (error: unknown): never => {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const errorCode = error.code;

    // Tratamento específico por tipo de erro para melhor UX
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

/**
 * Analisa um documento existente no repositório usando apenas o repositoryId
 * 
 * **Melhorias implementadas:**
 * - Validação robusta de entrada seguindo princípios SOLID
 * - Tratamento de erro específico e user-friendly
 * - Timeout configurável para melhor UX
 * - Type safety com TypeScript
 * - Separação de responsabilidades (SRP)
 * - Redução da complexidade cognitiva
 * 
 * **Benefícios:**
 * - Evita re-upload desnecessário de arquivos (principio DRY)
 * - Melhor performance ao reutilizar documentos existentes
 * - API calls mais eficientes
 * - Experiência do usuário mais fluida
 * - Código mais limpo e manutenível
 */
export const analyzeRepositoryDocument = async (request: RepositoryAnalysisRequest): Promise<AnalysisResponse> => {
  // Validação de entrada delegada para função específica
  validateRepositoryAnalysisRequest(request);

  try {
    // **Correção da URL**: Alinhando com a documentação da API
    // A API do backend segue o padrão: GET /minerva/repository/summarize/{repositoryId}
    // Mantemos flexibilidade para futuras expansões da API
    const response = await api.get<AnalysisResponse>(
      `/minerva/repository/${request.promptType}/${request.repositoryId}`, 
      {
        timeout: 60000, // 60 segundos
      }
    );

    return response.data;
  } catch (error: unknown) {
    // Tratamento de erro delegado para função específica
    return handleRepositoryAnalysisError(error);
  }
};
