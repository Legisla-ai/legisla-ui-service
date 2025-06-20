import api from './api';

export interface AnalysisRequest {
  file: File;
  promptType: string;
}

export interface AnalysisResponse {
  analysisId?: string;
  result?: any;
  [key: string]: any;
}

export const analyzeDocument = async (request: AnalysisRequest): Promise<AnalysisResponse> => {
  const formData = new FormData();
  formData.append('file', request.file);

  const response = await api.post<AnalysisResponse>(`/minerva/document/${request.promptType}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 60000,
  });

  return response.data;
};
