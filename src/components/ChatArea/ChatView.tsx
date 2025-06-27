// src/components/ChatArea/ChatView.tsx
import { ChatMessagesArea } from './ChatMessagesArea';
import { ChatActionsArea } from './ChatActionsArea';
import type { ChatMessageType } from '@/interfaces/chat';

interface ChatViewProps {
  readonly messages: ChatMessageType[];
  readonly usedAnalyses: Set<string>;
  readonly isSubmitting: boolean;
  readonly onAnalysisRequest: (promptKey: string) => void;
}

export function ChatView({ messages, usedAnalyses, isSubmitting, onAnalysisRequest }: ChatViewProps) {
  return (
    <div className="flex flex-col h-full w-full max-w-6xl mx-auto relative z-30">
      <ChatMessagesArea messages={messages} isSubmitting={isSubmitting} />

      <ChatActionsArea usedAnalyses={usedAnalyses} isSubmitting={isSubmitting} onAnalysisRequest={onAnalysisRequest} />
    </div>
  );
}
