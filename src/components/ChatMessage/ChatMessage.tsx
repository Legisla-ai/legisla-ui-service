import { User, Bot, Copy, Check } from 'lucide-react';
import { cn } from '@/utils';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import type { ChatMessageType } from '@/interfaces/chat';

// Componentes para markdown customizados
const markdownComponents = {
  h1: ({ children, ...props }: React.ComponentProps<'h1'>) => (
    <h1 className="text-xl font-bold mb-3 text-gray-900" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.ComponentProps<'h2'>) => (
    <h2 className="text-lg font-semibold mb-2 text-gray-800" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.ComponentProps<'h3'>) => (
    <h3 className="text-base font-medium mb-2 text-gray-700" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.ComponentProps<'p'>) => (
    <p className="mb-2 last:mb-0" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.ComponentProps<'ul'>) => (
    <ul className="list-disc pl-5 mb-2 space-y-1" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.ComponentProps<'ol'>) => (
    <ol className="list-decimal pl-5 mb-2 space-y-1" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.ComponentProps<'li'>) => (
    <li className="text-sm" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }: React.ComponentProps<'strong'>) => (
    <strong className="font-semibold text-gray-900" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: React.ComponentProps<'em'>) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  code: ({ children, ...props }: React.ComponentProps<'code'>) => (
    <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }: React.ComponentProps<'pre'>) => (
    <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto mb-2" {...props}>
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }: React.ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-2" {...props}>
      {children}
    </blockquote>
  ),
};

interface ChatMessageProps {
  readonly message: ChatMessageType;
  readonly isUser?: boolean;
}

export function ChatMessage({ message, isUser = false }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const textToCopy = typeof message === 'string' ? message : JSON.stringify(message, null, 2);
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar texto:', err);
    }
  };

  // Type guards para verificar propriedades do objeto
  const hasProperty = (obj: object, prop: string): obj is Record<string, unknown> => {
    return prop in obj;
  };

  const formatMessage = (content: unknown) => {
    let text: string;

    if (typeof content === 'string') {
      text = content;
    } else if (content && typeof content === 'object') {
      // Se for um objeto, tentar extrair o conteúdo ou stringificar
      if (hasProperty(content, 'content')) {
        text = String(content.content);
      } else if (hasProperty(content, 'analysis')) {
        text = String(content.analysis);
      } else if (hasProperty(content, 'message')) {
        text = String(content.message);
      } else {
        text = JSON.stringify(content, null, 2);
      }
    } else {
      text = String(content);
    }

    // Verificar se é markdown (contém # ou **) ou texto simples
    const isMarkdown = text.includes('#') || text.includes('**') || text.includes('*') || text.includes('`');

    if (isMarkdown && !isUser) {
      // Renderizar markdown para mensagens do bot
      return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={markdownComponents}>
          {text}
        </ReactMarkdown>
      );
    } else {
      // Para texto simples ou mensagens do usuário, preservar quebras de linha
      const lines = text.split('\n');
      return lines.map((line, index) => (
        <span key={`line-${line.substring(0, 20)}-${index}`}>
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      ));
    }
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
          <div
            className={cn(
              'text-sm leading-relaxed',
              isUser
                ? ''
                : 'prose prose-sm max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900'
            )}
          >
            {formatMessage(message)}
          </div>

          {!isUser && (
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-gray-100 transition-all duration-200"
              title="Copiar resposta"
            >
              {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3 text-gray-500" />}
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
