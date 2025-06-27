// src/interfaces/chat.ts
export interface ChatMessageType {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatAreaProps {
  readonly mode?: 'repository' | 'completeAnalysis' | 'riskAnalysis';
  readonly isSidebarOpen?: boolean;
}
