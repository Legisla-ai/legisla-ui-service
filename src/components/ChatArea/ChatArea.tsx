// src/components/ChatArea.tsx
import { CloudUploadOutlined, EditOutlined, FileTextOutlined, FormOutlined, LoadingOutlined } from '@ant-design/icons';
import type { AttachmentsProps, PromptsProps } from '@ant-design/x';
import { Attachments, Prompts } from '@ant-design/x';
import { useState } from 'react';

type ExtractFunc<T> = T extends (...args: never) => unknown ? T : never;

const getPlaceholderFn = (inlinePlaceholder: ReturnType<ExtractFunc<AttachmentsProps['placeholder']>>) => {
  return (type: 'inline' | 'drop') => (type === 'drop' ? { title: 'Drop file here' } : inlinePlaceholder);
};

export function ChatArea() {
  const [items, setItems] = useState<AttachmentsProps['items']>([]);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const onChange = ({ fileList }: { fileList: AttachmentsProps['items'] }) => {
    if (!fileList || fileList.length === 0) return;

    // Seleciona apenas o último arquivo
    const singleFile = fileList.slice(-1);
    console.log('onChange:', singleFile);
    setItems(singleFile);

    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadCompleted(true);
    }, 3000);
  };

  const sharedAttachmentProps: AttachmentsProps = {
    beforeUpload: () => false,
    items,
    onChange,
  };

  const promptsItems: PromptsProps['items'] = [
    {
      key: 'resume',
      icon: <FileTextOutlined style={{ color: '#1890ff' }} />,
      label: 'Resumir',
      description: 'Criar um resumo do documento',
    },
    {
      key: 'riskAnalysis',
      icon: <EditOutlined style={{ color: '#52c41a' }} />,
      label: 'Análise de Riscos',
      description: 'Elaborar uma análise sobre os riscos do documento',
    },
    {
      key: 'fullAnalysis',
      icon: <FormOutlined style={{ color: '#f5222d' }} />,
      label: 'Análise Completa',
      description: 'Gerar uma análise completa do documento',
    },
  ];

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      {items.length === 0 ? (
        <Attachments
          {...sharedAttachmentProps}
          placeholder={getPlaceholderFn({
            icon: <CloudUploadOutlined />,
            title: 'Vamos começar enviando um arquivo!',
            description: 'Formatos suportados: .docx e pdf',
          })}
        />
      ) : (
        <div className="flex flex-col items-center transition-all duration-700">
          {isUploading ? (
            <div className="mb-6 flex flex-col items-center transition-opacity duration-700">
              <LoadingOutlined style={{ fontSize: '32px' }} spin />
              <p className="mt-2 animate-pulse text-xl font-medium">Estamos carregando seu documento...</p>
            </div>
          ) : (
            <div
              className={`mb-6 transform transition-transform duration-700 ease-in-out ${
                uploadCompleted ? '-translate-y-8 opacity-100' : 'translate-y-0'
              }`}
            >
              <Attachments.FileCard item={items[0]} />
            </div>
          )}
          {uploadCompleted && !isUploading && (
            <div className="w-full flex flex-col items-center">
              <h3 className="mb-4 text-lg font-semibold">O que você quer fazer com {items[0].name}?</h3>
              <div className="w-full flex justify-center">
                <Prompts title="" items={promptsItems} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
