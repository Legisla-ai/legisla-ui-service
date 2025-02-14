// src/components/ChatArea/helpers.ts
import type { AttachmentsProps } from '@ant-design/x';
import { CloudUploadOutlined } from '@ant-design/icons';

type ExtractFunc<T> = T extends (...args: never[]) => unknown ? T : never;

export const getPlaceholderFn = (inlinePlaceholder: ReturnType<ExtractFunc<AttachmentsProps['placeholder']>>) => {
  return (type: 'inline' | 'drop') => (type === 'drop' ? { title: 'Drop file here' } : inlinePlaceholder);
};

export const defaultInlinePlaceholder = {
  icon: <CloudUploadOutlined />,
  title: 'Vamos começar enviando um arquivo!',
  description: 'Formatos suportados: .docx e pdf',
};
