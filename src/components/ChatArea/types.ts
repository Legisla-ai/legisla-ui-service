// src/components/ChatArea/types.ts
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
