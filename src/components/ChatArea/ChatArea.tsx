// src/components/ChatArea/ChatArea.tsx
import { LoadingOutlined } from '@ant-design/icons';
import type { AttachmentsProps } from '@ant-design/x';
import { Attachments, Prompts } from '@ant-design/x';
import { Tooltip } from 'antd';
import { Upload } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getPromptClasses, promptClassNames, promptsItems } from './constants';
import { defaultInlinePlaceholder, getPlaceholderFn } from './helpers';

export function ChatArea() {
  const [items, setItems] = useState<AttachmentsProps['items']>([]);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

    setItems([newItem]);
    setIsUploading(true);
    setUploadCompleted(false);

    setTimeout(() => {
      setItems([{ ...newItem, status: 'done', percent: 100 }]);
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

  return (
    <div className="flex items-center justify-center h-screen bg-[var(--background)]">
      {/* Input file escondido para seleção de novo arquivo */}
      <input type="file" ref={hiddenInputRef} onChange={handleFileSelect} style={{ display: 'none' }} />
      {items.length === 0 ? (
        <Attachments {...sharedAttachmentProps} placeholder={getPlaceholderFn(defaultInlinePlaceholder)} />
      ) : (
        <div className="flex flex-col items-center transition-all duration-700">
          {isUploading ? (
            <div className="mb-6 flex flex-col items-center transition-opacity duration-700">
              <LoadingOutlined style={{ fontSize: '32px' }} spin />
              <p className="mt-2 animate-pulse text-xl font-medium">Estamos carregando seu documento...</p>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-4 relative mb-4">
              <Attachments.FileCard item={items[0]} />
              <Tooltip title="Substituir documento">
                <button
                  onClick={handleReplace}
                  className="p-1 text-[#2f2f2f]/50 hover:text-[var(--muted-foreground)] cursor-pointer"
                >
                  <Upload style={{ fontSize: '24px' }} />
                </button>
              </Tooltip>
            </div>
          )}
          {uploadCompleted && !isUploading && (
            <div className="w-full p-4">
              <h3 className="mb-4 text-lg font-semibold text-center">O que você quer fazer com {items[0].name}?</h3>
              <div className="w-full">
                <Prompts
                  title=""
                  items={promptsItems}
                  classNames={{
                    ...promptClassNames,
                    ...getPromptClasses(windowWidth),
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
