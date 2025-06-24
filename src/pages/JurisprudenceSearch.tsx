import { Button as AntdButton, Input, Modal } from 'antd';
import { SearchIcon, Scale, Calendar, User } from 'lucide-react';
import { useState } from 'react';

interface Jurisprudence {
  id: number;
  title: string;
  summary: string;
  fullText: string;
  date: string;
  court: string;
  judge: string;
}

export default function JurisprudenceSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Jurisprudence[]>([]);
  const [selectedItem, setSelectedItem] = useState<Jurisprudence | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // Jurisprudence search functionality will be implemented when backend API is available
    setResults([]);
  };

  const openModal = (item: Jurisprudence) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <div className="bg-gradient-to-b from-cyan-50/5 to-white flex flex-col min-h-[calc(100vh-4rem)] font-sans animate-fadeIn">
      <main className="overflow-y-auto flex flex-col py-8 px-12 items-center justify-start gap-8">
        {/* Seção Hero */}
        <div className="text-center max-w-4xl animate-slideDown">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
            Pesquisa de{' '}
            <span className="bg-gradient-to-l from-teal-300 to-cyan-600 bg-clip-text text-transparent">
              Jurisprudências
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Encontre decisões e fundamentos jurídicos de forma rápida e eficiente
          </p>
        </div>

        {/* Seção Search */}
        <div className="w-full max-w-2xl mb-6 animate-slideUp">
          <Input
            id="search-input"
            placeholder="Digite termo, área ou palavra-chave..."
            onChange={(e) => handleSearch(e.target.value)}
            value={searchTerm}
            maxLength={50}
            prefix={<SearchIcon size={16} />}
            style={{ padding: '0.75rem', fontSize: '1.1rem' }}
            allowClear
            className="!text-lg !rounded-xl !border-gray-200 focus:!border-cyan-400 focus:!shadow-lg"
          />
        </div>

        {/* Resultados */}
        {results.length === 0 ? (
          <p className="text-base text-gray-400 mb-4">Nenhum resultado encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 animate-fadeInUp">
            {results.map((item) => (
              <div 
                key={item.id} 
                className="relative p-6 bg-white transition-all duration-300 ease-in-out flex flex-col gap-4 h-full backdrop-blur-10 shadow-legisla-sm hover:shadow-legisla-lg group"
                style={{
                  borderRadius: '12px',
                  border: '1px solid rgba(226, 232, 240, 0.6)',
                }}
              >
                {/* Ícone e título */}
                <div className="flex items-start gap-3">
                  <div className="text-cyan-700 text-2xl p-3 flex-shrink-0"
                       style={{ 
                         background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(2, 100, 144, 0.1))',
                         borderRadius: '12px'
                       }}>
                    <Scale size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-2">{item.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span className="truncate">{item.judge}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Court badge */}
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-cyan-700 bg-cyan-50 rounded-full">
                    {item.court}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-base mb-4 text-gray-700 line-clamp-4 flex-grow">{item.summary}</p>

                {/* Button */}
                <AntdButton 
                  onClick={() => openModal(item)} 
                  type="primary"
                  className="w-full !text-white text-base font-semibold !border-none py-4 px-6 transition-all duration-300 ease-in-out mt-auto"
                  style={{
                    background: 'linear-gradient(135deg, #026490, #22d3ee)',
                    border: 'none',
                    borderRadius: '10px',
                    boxShadow: '0 2px 8px rgba(2, 100, 144, 0.2)',
                  }}
                >
                  Ver detalhes
                </AntdButton>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        <Modal
          title={
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="text-cyan-700 p-2"
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(2, 100, 144, 0.1))',
                     borderRadius: '8px'
                   }}>
                <Scale size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{selectedItem?.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{selectedItem?.court}</span>
                  <span>•</span>
                  <span>{selectedItem?.date}</span>
                  <span>•</span>
                  <span>{selectedItem?.judge}</span>
                </div>
              </div>
            </div>
          }
          open={modalVisible}
          centered
          width={800}
          onCancel={() => setModalVisible(false)}
          footer={[
            <AntdButton 
              key="close" 
              onClick={() => setModalVisible(false)}
              type="primary"
              style={{
                background: 'linear-gradient(135deg, #026490, #22d3ee)',
                border: 'none',
                borderRadius: '8px',
              }}
            >
              Fechar
            </AntdButton>,
          ]}
          style={{
            borderRadius: '12px',
          }}
        >
          {selectedItem && (
            <div className="space-y-6 pt-4">
              <div>
                <h4 className="font-semibold mb-3 text-gray-800 text-lg">Ementa:</h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">{selectedItem.summary}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-800 text-lg">Texto Completo:</h4>
                <div className="p-4 bg-gray-50 rounded-lg max-h-96 overflow-y-auto">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">{selectedItem.fullText}</p>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </main>
    </div>
  );
}
