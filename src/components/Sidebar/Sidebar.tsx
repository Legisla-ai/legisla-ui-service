import { useState } from 'react';
import { Menu, Plus } from 'lucide-react';
import { Button } from 'antd';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  return (
    <div
      className={cn(
        'w-64 h-full bg-white border-r border-[var(--muted)]',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex flex-col h-full p-4">
        {/* Container para o botão <Menu> e "Novo Chat" */}
        <div className="flex items-center mb-4 gap-2">
          <Button type="text" onClick={onClose} className="hover:bg-[var(--muted)]! px-2! py-3!">
            <Menu className="h-5 w-5" />
          </Button>
          <Button className="ml-auto border-[var(--muted)]! hover:bg-[var(--muted)]! px-10! py-3!">
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-4 mb-2">
          <span className="text-md font-bold text-[var(--muted-foreground)] select-none p-2">Seus arquivos</span>
        </div>

        {/* Lista de chats */}
        <div className="flex flex-col gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              type="text"
              onClick={() => setSelectedChat(num)}
              className={cn(
                'justify-start! transition-colors p-2!',
                selectedChat === num
                  ? 'bg-[var(--muted)]! text-[var(--muted-foreground)]!'
                  : 'text-gray-600! hover:bg-gray-100!'
              )}
            >
              <span className="text-sm font-sans">Chat {num}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
