// src/components/ChatArea/FileUploadArea.tsx
import type { AttachmentsProps } from '@ant-design/x';
import { Attachments } from '@ant-design/x';
import { defaultInlinePlaceholder, getPlaceholderFn } from './helpers';

interface FileUploadAreaProps {
  readonly onFileSelect: (file: File) => void;
  readonly isSubmitting: boolean;
}

export function FileUploadArea({ onFileSelect, isSubmitting }: FileUploadAreaProps) {
  // Configuração para o componente Attachments do Ant Design
  const attachmentProps: AttachmentsProps = {
    beforeUpload: () => false,
    items: [],
    onChange: ({ fileList }) => {
      if (fileList && fileList.length > 0) {
        const lastFile = fileList.slice(-1)[0];
        const rcFile = lastFile?.originFileObj;
        if (rcFile instanceof File && !isSubmitting) {
          onFileSelect(rcFile);
        }
      }
    },
  };

  return (
    <div className="w-full max-w-4xl px-6 relative z-10">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 relative overflow-hidden">
        <div className="relative z-10">
          <Attachments 
            {...attachmentProps} 
            placeholder={getPlaceholderFn(defaultInlinePlaceholder)} 
          />
        </div>
      </div>
    </div>
  );
}
