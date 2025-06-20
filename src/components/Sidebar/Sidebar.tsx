import { useState } from 'react';
import { Menu, Plus, FileText, Clock, Star, Trash2, MoreHorizontal } from 'lucide-react';
import { Button, Dropdown } from 'antd';
import { cn } from '@/lib/utils';

interface SidebarProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

interface ChatItem {
  id: number;
  title: string;
  date: string;
  starred: boolean;
  type: 'pdf' | 'doc' | 'txt';
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [hoveredChat, setHoveredChat] = useState<number | null>(null);

  // Dados simulados dos chats
  const chatItems: ChatItem[] = [
    { id: 1, title: 'Contrato de Locação - Apartamento', date: '2 horas atrás', starred: true, type: 'pdf' },
    { id: 2, title: 'Análise de Riscos - Projeto Alpha', date: 'Ontem', starred: false, type: 'doc' },
    { id: 3, title: 'Termo de Uso - Plataforma Web', date: '3 dias atrás', starred: true, type: 'pdf' },
    { id: 4, title: 'Documento Fiscal - Q3 2024', date: '1 semana atrás', starred: false, type: 'txt' },
    { id: 5, title: 'Contrato Comercial - Fornecedor', date: '2 semanas atrás', starred: false, type: 'pdf' },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-500" />;
      case 'doc':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'txt':
        return <FileText className="w-4 h-4 text-gray-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleChatAction = (action: string, chatId: number) => {
    console.log(`${action} chat ${chatId}`);
  };

  return (
    <div
      className={cn(
        'w-72 h-full bg-gradient-to-b from-white to-gray-50/80 backdrop-blur-xl border-r border-gray-200/60 transition-all duration-300 ease-out shadow-xl flex-shrink-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header com efeito glassmorphism */}
        <div className="flex-shrink-0 p-5 border-b border-gray-200/60 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Repositório</h2>
            <Button
              type="text"
              onClick={onClose}
              className="!p-2 hover:!bg-gray-100 !rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Menu className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
          
          {/* Botão Criar Novo com gradiente */}
          <Button 
            className="w-full !h-10 !border-none !text-white font-semibold !rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #026490, #22d3ee)',
              boxShadow: '0 4px 15px rgba(2, 100, 144, 0.25)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #22d3ee, #4fe0e0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(2, 100, 144, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #026490, #22d3ee)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(2, 100, 144, 0.25)';
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
              <span className="text-sm">Novo Documento</span>
            </div>
            {/* Efeito shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </Button>
        </div>

        {/* Seção de arquivos com scroll customizado */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-shrink-0 px-4 py-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-semibold text-gray-600">Documentos Recentes</span>
            </div>
          </div>

          <div className="flex-1 px-4 pb-4 overflow-y-auto custom-scrollbar">
            <div className="space-y-2">
              {chatItems.map((chat) => (
                <button
                  key={chat.id}
                  className={cn(
                    'group relative p-3 rounded-lg transition-all duration-300 cursor-pointer border w-full text-left',
                    selectedChat === chat.id
                      ? 'bg-gradient-to-r from-legisla-turquoise-1/10 to-legisla-turquoise-2/10 border-legisla-turquoise-2/30 shadow-md'
                      : 'bg-white/70 hover:bg-white/90 border-gray-200/60 hover:border-legisla-turquoise-2/20 hover:shadow-md'
                  )}
                  onClick={() => setSelectedChat(chat.id)}
                  onMouseEnter={() => setHoveredChat(chat.id)}
                  onMouseLeave={() => setHoveredChat(null)}
                  aria-label={`Selecionar documento ${chat.title}`}
                >
                  {/* Linha de brilho sutil */}
                  <div className={cn(
                    'absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-legisla-turquoise-1/40 to-transparent transition-opacity duration-300',
                    hoveredChat === chat.id || selectedChat === chat.id ? 'opacity-100' : 'opacity-0'
                  )}></div>

                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="flex-shrink-0 mt-0.5">
                        {getFileIcon(chat.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-800 truncate mb-1 group-hover:text-legisla-turquoise-2 transition-colors duration-200">
                          {chat.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{chat.date}</span>
                          {chat.starred && (
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Menu de ações */}
                    <div className={cn(
                      'opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0',
                      selectedChat === chat.id && 'opacity-100'
                    )}>
                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: 'star',
                              label: chat.starred ? 'Remover estrela' : 'Adicionar estrela',
                              icon: <Star className="w-4 h-4" />,
                              onClick: () => handleChatAction('star', chat.id),
                            },
                            {
                              key: 'delete',
                              label: 'Excluir',
                              icon: <Trash2 className="w-4 h-4" />,
                              onClick: () => handleChatAction('delete', chat.id),
                              danger: true,
                            },
                          ],
                        }}
                        trigger={['click']}
                        placement="bottomRight"
                      >
                        <Button
                          type="text"
                          size="small"
                          className="!p-1 hover:!bg-gray-100 !rounded-md transition-all duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="w-3 h-3 text-gray-500" />
                        </Button>
                      </Dropdown>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer com informações */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200/60 bg-white/80 backdrop-blur-sm">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              {chatItems.length} documentos no repositório
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
