// src/components/ChatArea/constants.ts
import { FileTextOutlined, EditOutlined, FormOutlined } from '@ant-design/icons';
import type { PromptsProps } from '@ant-design/x';
import { SemanticType } from '@ant-design/x/es/prompts';

export const promptsItems: PromptsProps['items'] = [
  {
    key: 'summarize',
    icon: <FileTextOutlined style={{ color: '#1890ff' }} />,
    label: 'Resumir',
    description: 'Criar um resumo do documento',
  },
  {
    key: 'riskAnalysis',
    icon: <EditOutlined style={{ color: '#52c41a' }} />,
    label: 'Análise de Riscos',
    description: 'Elaborar uma análise de riscos do documento',
  },
  {
    key: 'fullAnalysis',
    icon: <FormOutlined style={{ color: '#f5222d' }} />,
    label: 'Análise Completa',
    description: 'Gerar uma análise completa do documento',
  },
];

export const getPromptClasses = (windowWidth: number, isSidebarOpen: boolean = false): Partial<Record<SemanticType, string>> => {
  const sidebarWidth = isSidebarOpen ? 256 : 0; // 256px = w-64
  const availableWidth = windowWidth - sidebarWidth;
  
  // Adjust breakpoint based on available width
  const shouldUseVerticalLayout = availableWidth < 1000 || windowWidth < 768;
  
  return {
    title: 'text-center font-bold mb-4 text-lg',
    list: shouldUseVerticalLayout 
      ? 'flex items-center! flex-col gap-3 w-full max-w-full' 
      : 'flex flex-row items-center gap-4 justify-center flex-wrap',
    item: shouldUseVerticalLayout 
      ? 'w-full max-w-[90%] shadow-md m-1 select-none' 
      : 'w-[280px] max-w-[300px] shadow-md my-4 mx-2 select-none flex-shrink-0',
  };
};

export const promptClassNames: Partial<Record<SemanticType, string>> = {};
