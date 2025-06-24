import { useState } from 'react';
import { Menu, Plus, FileText, Clock, Star, Trash2, MoreHorizontal, RefreshCw, AlertCircle } from 'lucide-react';
import { Button, Dropdown, Spin, Alert } from 'antd';
import { cn } from '@/lib/utils';
import { useRepositoryHistory } from '@/hooks/useRepositoryHistory';
import { DocumentItem } from '@/interfaces/repositoryHistory';

interface SidebarProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly repositoryId?: number; // ID do repositório atual
}

export function Sidebar({ isOpen, onClose, repositoryId = 1 }: SidebarProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [hoveredChat, setHoveredChat] = useState<string | null>(null);

  // Hook para buscar histórico da API
  const {
    data: documentItems = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useRepositoryHistory({
    repositoryId,
    enabled: repositoryId !== null,
    staleTime: 2 * 60 * 1000, // 2 minutos
  });

  // Fallback para dados simulados se não houver repositoryId ou erro
  const fallbackItems: DocumentItem[] = [
    { 
      id: 'fallback-1', 
      title: 'Contrato de Locação - Apartamento', 
      date: '2 horas atrás', 
      starred: true, 
      type: 'pdf',
      originalData: {
        repositoryId: 0,
        message: 'Contrato de Locação - Apartamento',
        sender: 'USER',
        interactionType: 'DOCUMENT_UPLOAD',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
      }
    },
    { 
      id: 'fallback-2', 
      title: 'Análise de Riscos - Projeto Alpha', 
      date: 'Ontem', 
      starred: false, 
      type: 'doc',
      originalData: {
        repositoryId: 0,
        message: 'Análise de Riscos - Projeto Alpha',
        sender: 'AI',
        interactionType: 'ANALYSIS_COMPLETE',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
      }
    },
  ];

  const chatItems = isError ? fallbackItems : documentItems;

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-500" />;
      case 'doc':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'txt':
        return <FileText className="w-4 h-4 text-gray-500" />;
      case 'chat':
        return <FileText className="w-4 h-4 text-green-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleChatAction = (action: string, chatId: string) => {
    console.log(`${action} chat ${chatId}`);
    if (action === 'refresh') {
      refetch();
    }
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
          
          {/* Botão Criar Novo Documento */}
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

        {/* Conteúdo da seção de documentos */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-shrink-0 px-4 py-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-semibold text-gray-600">Documentos Recentes</span>
            </div>
          </div>

          <div className="flex-1 px-4 pb-4 overflow-y-auto custom-scrollbar">
            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Spin size="small" />
                <p className="text-xs text-gray-500 mt-2">Carregando documentos...</p>
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="p-3 mb-3">
                <Alert
                  message="Erro ao carregar documentos"
                  description={error?.message ?? 'Erro desconhecido'}
                  type="error"
                  showIcon
                  action={
                    <Button size="small" onClick={() => refetch()}>
                      Tentar novamente
                    </Button>
                  }
                />
              </div>
            )}

            {/* Documents List */}
            {!isLoading && (
              <div className="space-y-2">
                {chatItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
                    <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="text-sm">Nenhum documento encontrado</p>
                    <Button 
                      size="small" 
                      type="text" 
                      icon={<RefreshCw className="w-3 h-3" />}
                      onClick={() => refetch()}
                      className="mt-2"
                    >
                      Atualizar
                    </Button>
                  </div>
                ) : (
                  chatItems.map((chat) => (
                <button
                  key={chat.id}
                  type="button"
                  className={cn(
                    'group relative rounded-lg transition-all duration-300 border w-full text-left',
                    selectedChat === chat.id
                      ? 'bg-gradient-to-r from-cyan-400/10 to-cyan-700/10 border-cyan-700/30 shadow-md'
                      : 'bg-white/70 hover:bg-white/90 border-gray-200/60 hover:border-cyan-700/20 hover:shadow-md'
                  )}
                  onMouseEnter={() => setHoveredChat(chat.id)}
                  onMouseLeave={() => setHoveredChat(null)}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  {/* Linha de brilho sutil */}
                  <div className={cn(
                    'absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent transition-opacity duration-300',
                    hoveredChat === chat.id || selectedChat === chat.id ? 'opacity-100' : 'opacity-0'
                  )}></div>

                  <div className="flex items-start justify-between p-3">
                    <button
                      type="button"
                      className="flex items-start gap-3 flex-1 min-w-0 text-left bg-transparent border-none cursor-pointer hover:outline-none focus:outline-none"
                      onClick={() => setSelectedChat(chat.id)}
                      aria-label={`Selecionar documento ${chat.title}`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {getFileIcon(chat.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-800 truncate mb-1 group-hover:text-cyan-700 transition-colors duration-200">
                          {chat.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{chat.date}</span>
                          {chat.starred && (
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          )}
                        </div>
                      </div>
                    </button>

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
                        <button
                          type="button"
                          className="p-1 hover:bg-gray-100 rounded-md transition-all duration-200 border-none bg-transparent cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="Mais opções"
                        >
                          <MoreHorizontal className="w-3 h-3 text-gray-500" />
                        </button>
                      </Dropdown>
                    </div>                    </div>
                  </button>
                  ))
                )}
              </div>
            )}
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
