import api from "./api";

const DOCUMENT_URL = "/minerva/document";
const UPLOAD_DOCUMENT_URL = DOCUMENT_URL + "/upload";
const SUMMARIZE_DOCUMENT_URL = DOCUMENT_URL + "/summarize/";
const ANALYZE_DOCUMENT_URL = DOCUMENT_URL + "/analyze/";
const ANALYZE_RISKS_URL = DOCUMENT_URL + "/analyze-risks/";

export interface Usage {
  inputTokens: number,
  outputTokens: number
}

export interface Content {
  type: string,
  text: string
}

export interface AgentResponse {
  model: string,
  usage: Usage,
  content: Content[]
}



export async function uploadDocument(file: File, documentType: string): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentType);

    const response = await api.post<string>(UPLOAD_DOCUMENT_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao fazer upload do documento:", error);
    throw new Error("Erro ao enviar o arquivo. Tente novamente.");
  }
}