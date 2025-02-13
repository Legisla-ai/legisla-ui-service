import { PlusCircle, MessageCircle, ChevronDown, Settings, X } from 'lucide-react';
import { Button } from 'antd';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <div
      className={cn(
        'w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out h-full',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <Button variant="solid" onClick={onClose} className="md:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <Button className="w-full mb-4 bg-[#01b1b1] text-white hover:bg-[#01b1b1]/90">
          <PlusCircle className="mr-2 h-5 w-5" /> Novo Chat
        </Button>
        <div className="mb-4">
          <Button variant="solid" className="w-full justify-between">
            Chats Recentes
            <ChevronDown className="h-4 w-4 transition-transform transform rotate-180" />
          </Button>
          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              variant="solid"
              className="w-full justify-start text-gray-600 hover:text-[#01b1b1] hover:bg-[#01b1b1]/10"
            >
              <MessageCircle className="mr-2 h-5 w-5" /> Chat {num}
            </Button>
          ))}
        </div>
        <Button
          variant="solid"
          className="w-full justify-start mt-auto text-gray-600 hover:text-[#01b1b1] hover:bg-[#01b1b1]/10"
        >
          <Settings className="mr-2 h-5 w-5" /> Configurações
        </Button>
      </div>
    </div>
  );
}
