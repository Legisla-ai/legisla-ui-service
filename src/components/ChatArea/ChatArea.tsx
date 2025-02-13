import { Send, Paperclip } from 'lucide-react';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { cn } from '@/lib/utils';
import { Button, Input } from 'antd';

export function ChatArea() {
  return (
    <div className={cn('flex flex-col h-full bg-gray-50')}>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Exemplos de mensagens */}
        <ChatMessage message="Olá, como posso ajudar?" isUser={false} />
        <ChatMessage message="Preciso de informações sobre o produto." isUser={true} />
        {/* Exemplo de indicador de carregamento */}
        <div className="flex justify-start">
          <div className="bg-white rounded-lg p-3 max-w-[80%] shadow-sm">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-[#01b1b1] rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-[#01b1b1] rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-[#01b1b1] rounded-full animate-bounce delay-200" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        <form className="flex items-center space-x-2">
          <Button className="text-gray-500 hover:text-[#01b1b1]">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-gray-100 border-gray-300 focus:ring-[#01b1b1] focus:border-[#01b1b1]"
          />
          <Button className="bg-[#01b1b1] hover:bg-[#01b1b1]/90 text-white">
            <Send className="h-5 w-5" />
          </Button>
        </form>
        <input type="file" className="hidden" />
      </div>
    </div>
  );
}
