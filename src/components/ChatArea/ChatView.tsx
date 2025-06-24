// src/components/ChatArea/ChatView.tsx
import { ChatHeader } from './ChatHeader';
import { ChatMessagesArea } from './ChatMessagesArea';
import { ChatActionsArea } from './ChatActionsArea';
import type { ChatMessageType } from './types';
import { getFileSize } from './utils';

interface ChatViewProps {
  readonly currentFile: File | null;
  readonly messages: ChatMessageType[];
  readonly usedAnalyses: Set<string>;
  readonly isSubmitting: boolean;
  readonly onAnalysisRequest: (promptKey: string) => void;
  readonly onNewDocument: () => void;
  readonly onClose: () => void;
}

export function ChatView({ 
  currentFile, 
  messages, 
  usedAnalyses, 
  isSubmitting, 
  onAnalysisRequest, 
  onNewDocument, 
  onClose 
}: ChatViewProps) {
  return (
    <div className="flex flex-col h-screen w-full max-w-6xl mx-auto relative z-10">
      <ChatHeader
        fileName={currentFile?.name}
        fileSize={currentFile ? getFileSize(currentFile) : undefined}
        analysisCount={usedAnalyses.size}
        messageCount={messages.length}
        onNewDocument={onNewDocument}
        onClose={onClose}
      />

      <ChatMessagesArea
        messages={messages}
        isSubmitting={isSubmitting}
      />

      <ChatActionsArea
        usedAnalyses={usedAnalyses}
        isSubmitting={isSubmitting}
        onAnalysisRequest={onAnalysisRequest}
      />
    </div>
  );
}
