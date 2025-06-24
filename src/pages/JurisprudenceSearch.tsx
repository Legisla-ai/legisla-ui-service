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

const mockJurisprudences: Jurisprudence[] = [
  {
    id: 1,
    title: 'Recurso Especial nº 1.234.567/SP',
    summary:
      'DIREITO CIVIL. RESPONSABILIDADE CIVIL. DANOS MORAIS. PUBLICAÇÃO DE MATÉRIA JORNALÍSTICA. LIBERDADE DE IMPRENSA. LIMITES. OFENSA À HONRA E IMAGEM. QUANTUM INDENIZATÓRIO. RAZOABILIDADE E PROPORCIONALIDADE.',
    fullText:
      'DIREITO CIVIL. RESPONSABILIDADE CIVIL. DANOS MORAIS. PUBLICAÇÃO DE MATÉRIA JORNALÍSTICA. LIBERDADE DE IMPRENSA. LIMITES. OFENSA À HONRA E À IMAGEM. 1. A liberdade de imprensa, garantia constitucional, não é absoluta, encontrando limites nos direitos da personalidade, notadamente no direito à honra e à imagem. 2. A publicação de matéria jornalística que extrapola o animus narrandi, com a imputação de condutas ofensivas à honra e à imagem do autor, enseja a responsabilização civil do veículo de comunicação. 3. O valor da indenização por danos morais deve ser fixado com moderação, considerando a gravidade do ato, o potencial econômico do ofensor e a extensão do dano. 4. Recurso especial parcialmente provido.',
    date: '15/03/2023',
    court: 'Superior Tribunal de Justiça',
    judge: 'Min. João Silva',
  },
  {
    id: 2,
    title: 'Agravo em Recurso Especial nº 987.654/RJ',
    summary:
      'PROCESSUAL CIVIL. AGRAVO EM RECURSO ESPECIAL. AÇÃO DE COBRANÇA. CONTRATO DE PRESTAÇÃO DE SERVIÇOS. INADIMPLEMENTO. CORREÇÃO MONETÁRIA. TERMO INICIAL. DATA DO VENCIMENTO DA OBRIGAÇÃO.',
    fullText:
      'PROCESSUAL CIVIL. AGRAVO EM RECURSO ESPECIAL. AÇÃO DE COBRANÇA. CONTRATO DE PRESTAÇÃO DE SERVIÇOS. INADIMPLEMENTO. CORREÇÃO MONETÁRIA. TERMO INICIAL. DATA DO VENCIMENTO DA OBRIGAÇÃO. 1. Nos termos da jurisprudência desta Corte, o termo inicial da correção monetária em casos de inadimplemento contratual é a data do vencimento da obrigação. 2. A correção monetária não constitui um plus, mas mera recomposição do poder aquisitivo da moeda corroído pela inflação. 3. Agravo em recurso especial conhecido para negar provimento ao recurso especial.',
    date: '22/05/2023',
    court: 'Superior Tribunal de Justiça',
    judge: 'Min. Maria Oliveira',
  },
  {
    id: 3,
    title: 'Recurso Extraordinário nº 123.456/MG',
    summary:
      'DIREITO CONSTITUCIONAL. RECURSO EXTRAORDINÁRIO. REPERCUSSÃO GERAL. DIREITO À SAÚDE. FORNECIMENTO DE MEDICAMENTOS DE ALTO CUSTO NÃO DISPONÍVEIS NA LISTA DO SUS. REQUISITOS.',
    fullText:
      'DIREITO CONSTITUCIONAL. RECURSO EXTRAORDINÁRIO. REPERCUSSÃO GERAL. DIREITO À SAÚDE. FORNECIMENTO DE MEDICAMENTOS DE ALTO CUSTO NÃO DISPONÍVEIS NA LISTA DO SUS. REQUISITOS. 1. O Estado não pode ser obrigado a fornecer medicamentos experimentais, sem registro na ANVISA ou não recomendados pelos Protocolos Clínicos do SUS. 2. É possível, excepcionalmente, a concessão judicial de medicamento sem registro sanitário, em caso de mora irrazoável da ANVISA em apreciar o pedido de registro. 3. É necessária a demonstração da incapacidade financeira do paciente e da ineficácia dos fármacos fornecidos pelo SUS. 4. Recurso extraordinário a que se dá parcial provimento.',
    date: '10/04/2023',
    court: 'Supremo Tribunal Federal',
    judge: 'Min. Carlos Mendes',
  },
  {
    id: 4,
    title: 'Habeas Corpus nº 654.321/DF',
    summary:
      'DIREITO PENAL E PROCESSUAL PENAL. HABEAS CORPUS. TRÁFICO DE DROGAS. PRISÃO PREVENTIVA. FUNDAMENTAÇÃO IDÔNEA. GARANTIA DA ORDEM PÚBLICA. REITERAÇÃO DELITIVA. QUANTIDADE E NATUREZA DA DROGA APREENDIDA.',
    fullText:
      'DIREITO PENAL E PROCESSUAL PENAL. HABEAS CORPUS. TRÁFICO DE DROGAS. PRISÃO PREVENTIVA. FUNDAMENTAÇÃO IDÔNEA. GARANTIA DA ORDEM PÚBLICA. REITERAÇÃO DELITIVA. QUANTIDADE E NATUREZA DA DROGA APREENDIDA. 1. A prisão preventiva foi devidamente fundamentada na garantia da ordem pública, considerando a quantidade e natureza da droga apreendida (5kg de cocaína), bem como o risco concreto de reiteração delitiva, evidenciado pelos antecedentes criminais do paciente. 2. A periculosidade do agente, evidenciada pelo modus operandi do crime e pela reincidência específica, constitui fundamento idôneo para a decretação da prisão preventiva. 3. Ordem de habeas corpus denegada.',
    date: '18/06/2023',
    court: 'Superior Tribunal de Justiça',
    judge: 'Min. Pedro Santos',
  },
  {
    id: 5,
    title: 'Apelação Cível nº 0001234-56.2022.8.26.0100',
    summary:
      'DIREITO DO CONSUMIDOR. APELAÇÃO CÍVEL. AÇÃO DE INDENIZAÇÃO POR DANOS MATERIAIS E MORAIS. FALHA NA PRESTAÇÃO DE SERVIÇO. CANCELAMENTO DE VOO. REACOMODAÇÃO TARDIA. DANOS MORAIS CONFIGURADOS.',
    fullText:
      'DIREITO DO CONSUMIDOR. APELAÇÃO CÍVEL. AÇÃO DE INDENIZAÇÃO POR DANOS MATERIAIS E MORAIS. FALHA NA PRESTAÇÃO DE SERVIÇO. CANCELAMENTO DE VOO. REACOMODAÇÃO TARDIA. DANOS MORAIS CONFIGURADOS. 1. O cancelamento de voo, com reacomodação do passageiro somente após 24 horas, configura falha na prestação do serviço e gera o dever de indenizar. 2. Os transtornos sofridos pelo consumidor, que teve que pernoitar em local diverso do contratado, ultrapassam o mero dissabor cotidiano e caracterizam dano moral indenizável. 3. O valor da indenização por danos morais deve ser fixado considerando as circunstâncias do caso concreto, a capacidade econômica das partes e o caráter pedagógico da medida. 4. Recurso de apelação parcialmente provido para majorar o valor da indenização por danos morais.',
    date: '05/07/2023',
    court: 'Tribunal de Justiça de São Paulo',
    judge: 'Des. Ana Costa',
  },
];

export default function JurisprudenceSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Jurisprudence[]>(mockJurisprudences);
  const [selectedItem, setSelectedItem] = useState<Jurisprudence | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filteredResults = mockJurisprudences.filter(
      (item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.summary.toLowerCase().includes(value.toLowerCase()) ||
        item.fullText.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filteredResults);
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
