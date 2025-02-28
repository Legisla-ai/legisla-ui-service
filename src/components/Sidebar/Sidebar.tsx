import { useState, useEffect, useCallback } from 'react';
import { Menu, Plus } from 'lucide-react';
import { Button } from 'antd';
import { cn } from '@/lib/utils';

interface Chat {
  id: number;
  name: string;
  messages: { message: string; isUser: boolean }[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onChatSelect: (chatId: number) => void;
  onNewChat: () => void;
  chats: Chat[];
  selectedChatId: number | null;
}

export function Sidebar({ isOpen, onClose, onChatSelect, onNewChat, chats, selectedChatId }: SidebarProps) {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  useEffect(() => {
    setSelectedChat(selectedChatId);
  }, [selectedChatId]);

  const handleChatSelect = useCallback((chatId: number) => {
    setSelectedChat(chatId);
    onChatSelect(chatId);
  }, [onChatSelect]);

  return (
    <div
      className={cn(
        'w-64 h-full bg-white border-r border-[var(--muted)]',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center mb-4 gap-2">
          <Button type="text" onClick={onClose} className="hover:bg-[var(--muted)]! px-2! py-3!">
            <Menu className="h-5 w-5" />
          </Button>
          <span className="text-md font-bold text-[var(--muted-foreground)] select-none p-2">Meus documentos</span>
        </div>

        <div className="flex flex-col gap-2">
          {Array.isArray(chats) && chats.map((chat) => (
            <Button
              key={chat.id}
              type="text"
              onClick={() => handleChatSelect(chat.id)}
              className={cn(
                'justify-start! transition-colors p-2!',
                selectedChat === chat.id
                  ? 'bg-[var(--muted)]! text-[var(--muted-foreground)]!'
                  : 'text-gray-600! hover:bg-gray-100!'
              )}
            >
              <span className="text-sm font-sans">{chat.name}</span>
            </Button>
          ))}
          <Button
            type="text"
            onClick={onNewChat}
            className={"justify-center! transition-colors p-2 text-gray-600! hover:bg-gray-100!"}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}