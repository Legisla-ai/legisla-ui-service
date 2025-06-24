import { User, Bot, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ChatMessageProps {
  readonly message: string;
  readonly isUser?: boolean;
}

export function ChatMessage({ message, isUser = false }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar texto:', err);
    }
  };

  const formatMessage = (text: string) => {
    // Preservar quebras de linha
    const lines = text.split('\n');
    return lines.map((line, index) => (
      <span key={`line-${line.substring(0, 20)}-${index}`}>
        {line}
        {index < lines.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className={cn('flex items-start gap-3 group', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-700 to-cyan-400 flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}
      
      <div className={cn('relative max-w-[75%]', isUser ? 'order-first' : '')}>
        <div
          className={cn(
            'p-4 rounded-2xl shadow-sm border',
            isUser
              ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white border-blue-500/30 shadow-lg'
              : 'bg-white text-gray-800 border-gray-200'
          )}
        >
          <div className={cn('text-sm leading-relaxed', isUser ? '' : 'prose prose-sm max-w-none')}>
            {formatMessage(message)}
          </div>
          
          {!isUser && (
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-gray-100 transition-all duration-200"
              title="Copiar resposta"
            >
              {copied ? (
                <Check className="h-3 w-3 text-green-600" />
              ) : (
                <Copy className="h-3 w-3 text-gray-500" />
              )}
            </button>
          )}
        </div>
        
        {!isUser && (
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <span>Legisla.AI</span>
            <span>•</span>
            <span>{new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
          <User className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  );
}
