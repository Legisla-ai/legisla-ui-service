// src/utils/chat.ts
import type { ChatMessageType } from '@/interfaces/chat';

export const truncateFileName = (fileName: string, maxLength: number = 40): string => {
  if (fileName.length <= maxLength) return fileName;

  const extension = fileName.split('.').pop();
  const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
  const truncatedName = nameWithoutExtension.substring(0, maxLength - extension!.length - 4);

  return `${truncatedName}...${extension}`;
};

export const getFileSize = (file: File): string => {
  return `${(file.size / 1024 / 1024).toFixed(2)} MB`;
};

export const getActionTitle = (action: string): string => {
  const actionTitles: Record<string, string> = {
    summarize: 'Resumo do Documento',
    riskAnalysis: 'Análise de Riscos',
    fullAnalysis: 'Análise Completa',
  };

  return actionTitles[action] ?? action;
};

export const createMessage = (content: string, isUser: boolean = false): ChatMessageType => {
  return {
    id: Date.now().toString(),
    content,
    isUser,
    timestamp: new Date(),
  };
};
