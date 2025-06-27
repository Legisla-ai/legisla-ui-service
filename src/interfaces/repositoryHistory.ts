export interface RepositoryResponse {
  readonly id: number;
  readonly documentId: number;
  readonly organizationId: number;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface RepositoryChatHistoryResponse {
  readonly repositoryId: number;
  readonly message: string;
  readonly sender: string;
  readonly interactionType: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface RepositoryChatHistoryResponse {
  readonly repositoryId: number;
  readonly message: string;
  readonly sender: string;
  readonly interactionType: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ChatHistoryItem {
  readonly id: string;
  readonly content: string;
  readonly isUser: boolean;
  readonly timestamp: Date;
  readonly interactionType: string;
  readonly originalData: RepositoryChatHistoryResponse;
}

export interface DocumentItem {
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly type: 'chat' | 'pdf' | 'doc' | 'txt';
  readonly originalData: RepositoryResponse;
}

export enum InteractionType {
  DOCUMENT_UPLOAD = 'DOCUMENT_UPLOAD',
  ANALYSIS_REQUEST = 'ANALYSIS_REQUEST',
  ANALYSIS_COMPLETE = 'ANALYSIS_COMPLETE',
  CHAT_MESSAGE = 'CHAT_MESSAGE',
  ERROR = 'ERROR',
}

export enum SenderType {
  USER = 'USER',
  AI = 'AI',
  SYSTEM = 'SYSTEM',
}
