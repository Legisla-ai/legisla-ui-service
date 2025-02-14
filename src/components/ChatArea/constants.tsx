// src/components/ChatArea/constants.ts
import { FileTextOutlined, EditOutlined, FormOutlined } from '@ant-design/icons';
import type { PromptsProps } from '@ant-design/x';
import { SemanticType } from '@ant-design/x/es/prompts';

const breakpoint = 1200;

export const promptsItems: PromptsProps['items'] = [
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
    description: 'Elaborar uma análise de riscos do documento',
  },
  {
    key: 'fullAnalysis',
    icon: <FormOutlined style={{ color: '#f5222d' }} />,
    label: 'Análise Completa',
    description: 'Gerar uma análise completa do documento',
  },
];

export const getPromptClasses = (windowWidth: number): Partial<Record<SemanticType, string>> => ({
  title: 'text-center font-bold mb-4 text-lg', // título centralizado, negrito e margem inferior
  list: windowWidth < breakpoint ? 'flex items-center! flex-col gap-2' : 'flex flex-row items-center gap-4', // layout responsivo com espaçamento
  item: windowWidth < breakpoint ? 'w-[85%]' : 'w-[25vw]',
});

export const promptClassNames: Partial<Record<SemanticType, string>> = {};
