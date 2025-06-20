// src/components/ChatArea/ChatArea.tsx
import { LoadingOutlined } from '@ant-design/icons';
import type { AttachmentsProps } from '@ant-design/x';
import { Attachments } from '@ant-design/x';
import { Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { analyzeDocument } from '../../services/documentAnalysisService';
import { ANALYSIS_OPTIONS } from './constants';
import { defaultInlinePlaceholder, getPlaceholderFn } from './helpers';

interface ChatAreaProps {
  readonly mode?: 'repository' | 'completeAnalysis' | 'riskAnalysis';
  readonly isSidebarOpen?: boolean;
}

export function ChatArea({ mode: _mode = 'repository', isSidebarOpen: _isSidebarOpen = false }: ChatAreaProps) {
  const [items, setItems] = useState<AttachmentsProps['items']>([]);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const onChange = ({ fileList }: { fileList: AttachmentsProps['items'] }) => {
    if (!fileList || fileList.length === 0) return;
    const singleFile = fileList.slice(-1);
    setItems(singleFile);
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadCompleted(true);
    }, 500);
  };

  const sharedAttachmentProps: AttachmentsProps = {
    beforeUpload: () => false,
    items,
    onChange,
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newItem = {
      uid: `${Date.now()}`,
      name: file.name,
      status: 'uploading' as const,
      percent: 0,
      size: file.size,
      type: file.type,
      originFileObj: file,
    };

    setItems([newItem as any]);
    setIsUploading(true);
    setUploadCompleted(false);

    setTimeout(() => {
      setItems([
        {
          ...newItem,
          status: 'done',
          percent: 100,
          originFileObj: {
            ...newItem.originFileObj,
            uid: newItem.uid,
            lastModifiedDate: new Date(),
          },
        },
      ]);
      setIsUploading(false);
      setUploadCompleted(true);
    }, 500);

    e.target.value = '';
  };

  const handleReplace = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  };

  const truncateFileName = (fileName: string, maxLength: number = 40) => {
    if (fileName.length <= maxLength) return fileName;
    
    const extension = fileName.split('.').pop();
    const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
    const truncatedName = nameWithoutExt.substring(0, maxLength - extension!.length - 4);
    
    return `${truncatedName}...${extension}`;
  };

  const handlePromptSubmit = async (promptKey: string) => {
    setIsSubmitting(true);

    if (!items || items.length === 0) {
      console.error('Nenhum arquivo foi enviado');
      return;
    }

    const file = items[0];
    if (!file.originFileObj) {
      console.error('Arquivo não encontrado');
      return;
    }

    try {
      await analyzeDocument({ file: file.originFileObj, promptType: promptKey });
    } catch (error) {
      console.error('Erro durante a análise:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 w-full overflow-hidden relative">
      {/* Elementos decorativos minimalistas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-legisla-turquoise-2/5 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-legisla-turquoise-1/5 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Input file escondido para seleção de novo arquivo */}
      <input 
        type="file" 
        ref={hiddenInputRef} 
        onChange={handleFileSelect} 
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.rtf,.odt" 
      />
      
      {!items || items.length === 0 ? (
        <div className="w-full max-w-4xl px-6 relative z-10">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 relative overflow-hidden">
            {/* Container do componente Attachments com espaçamento aprimorado */}
            <div className="relative z-10">
              <Attachments {...sharedAttachmentProps} placeholder={getPlaceholderFn(defaultInlinePlaceholder)} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center transition-all duration-700 ease-out w-full max-w-5xl px-8 relative z-10">
          {isUploading ? (
            <div className="mb-10 flex flex-col items-center bg-white rounded-lg border border-gray-200 shadow-sm p-8">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full bg-legisla-turquoise-2 flex items-center justify-center">
                  <LoadingOutlined className="text-white text-2xl" spin />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Processando documento
              </h3>
              <p className="text-gray-600 text-center max-w-sm">
                Carregando e preparando para análise...
              </p>
            </div>
          ) : (
            <div className="w-full max-w-4xl mx-auto mb-8 bg-white rounded-lg border border-gray-200 shadow-sm p-6 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-medium text-gray-900 truncate mb-1">
                      {items[0]?.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {items[0]?.size ? `${(items[0].size / 1024 / 1024).toFixed(2)} MB` : 'Tamanho não disponível'} • PDF
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={handleReplace}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-legisla-turquoise-2 transition-colors duration-200"
                  >
                    <Upload className="w-4 h-4" />
                    Substituir
                  </button>
                  
                  <button
                    onClick={() => {
                      setItems([]);
                      setUploadCompleted(false);
                    }}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remover
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {uploadCompleted && !isUploading && (
            <div className="w-full overflow-hidden">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Perfeito! Como posso ajudar com este documento?
                </h3>
                <p className="text-gray-600 mb-1 font-medium">
                  {truncateFileName(items[0]?.name || 'documento', 60)}
                </p>
                <p className="text-sm text-gray-500">
                  Selecione o tipo de análise jurídica que melhor atende sua necessidade
                </p>
              </div>
              
              {isSubmitting ? (
                <div className="flex flex-col items-center justify-center py-16 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 relative overflow-hidden">
                  {/* Efeito shimmer de fundo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-legisla-turquoise-1/5 to-transparent -translate-x-full animate-shimmer"></div>
                  
                  <div className="relative mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-legisla-turquoise-2 to-legisla-turquoise-1 flex items-center justify-center shadow-2xl">
                      <LoadingOutlined className="text-white text-4xl" spin />
                    </div>
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-legisla-turquoise-2/20 to-legisla-turquoise-1/20 animate-ping"></div>
                    <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-legisla-turquoise-2/10 to-legisla-turquoise-1/10 animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-gray-800 mb-3">
                    Processando sua solicitação
                  </h4>
                  <p className="text-gray-600 text-center max-w-lg leading-relaxed mb-6">
                    Nossa inteligência artificial está analisando o documento com cuidado. 
                    Este processo pode levar alguns instantes para garantir a melhor qualidade.
                  </p>
                  
                  {/* Indicadores de progresso visuais */}
                  <div className="flex items-center gap-8 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-legisla-turquoise-2 rounded-full animate-bounce"></div>
                      <span className="text-sm text-gray-500">Reading</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-legisla-turquoise-2 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <span className="text-sm text-gray-500">Analyzing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-legisla-turquoise-2 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      <span className="text-sm text-gray-500">Processing</span>
                    </div>
                  </div>
                  
                  {/* Barra de progresso animada */}
                  <div className="w-80 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-legisla-turquoise-2 to-legisla-turquoise-1 rounded-full animate-pulse transform origin-left"></div>
                  </div>
                </div>
              ) : (
                <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {ANALYSIS_OPTIONS.map((option: { title: string; description: string; icon: string; action: string }) => (
                      <button
                        key={option.action}
                        onClick={() => handlePromptSubmit(option.action)}
                        className="group p-5 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{option.icon}</span>
                          <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                            {option.title}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {option.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
