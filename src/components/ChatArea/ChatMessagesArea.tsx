// src/components/ChatArea/ChatMessagesArea.tsx
import { useRef, useEffect } from 'react';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import type { ChatMessageType } from '@/interfaces/chat';

interface ChatMessagesAreaProps {
  readonly messages: ChatMessageType[];
  readonly isSubmitting: boolean;
}

export function ChatMessagesArea({ messages, isSubmitting }: ChatMessagesAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} isUser={message.isUser} />
      ))}

      {isSubmitting && (
        <div className="flex justify-start">
          <div className="flex items-start space-x-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-700 to-cyan-400 flex items-center justify-center flex-shrink-0 mt-1">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="p-4 rounded-2xl bg-white text-gray-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-cyan-700 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-cyan-700 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>
              <p className="text-xs text-gray-600">Analisando documento...</p>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
