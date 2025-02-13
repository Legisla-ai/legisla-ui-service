import { User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isUser?: boolean;
}

export function ChatMessage({ message, isUser = false }: ChatMessageProps) {
  return (
    <div className={cn('flex items-end', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn('flex items-end space-x-2 max-w-[80%]', isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row')}
      >
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center',
            isUser ? 'bg-[#01b1b1]' : 'bg-gray-300'
          )}
        >
          {isUser ? <User className="h-5 w-5 text-white" /> : <Bot className="h-5 w-5 text-gray-600" />}
        </div>
        <div className={cn('p-3 rounded-lg shadow-sm', isUser ? 'bg-[#01b1b1] text-white' : 'bg-white text-gray-800')}>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}
