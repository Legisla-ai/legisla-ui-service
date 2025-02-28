import { FileTextOutlined, EditOutlined, FormOutlined, FileSearchOutlined } from '@ant-design/icons';
import type React from 'react';
import { SemanticType } from '@ant-design/x/es/prompts';

const breakpoint = 1200;
export interface AnalysisOption {
  key: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  color: string;
}

export const promptsItems: AnalysisOption[] = [
  {
    key: 'resume',
    icon: <FileTextOutlined style={{ color: '#1890ff' }} />,
    label: 'Resumir',
    description: 'Crie um resumo do documento',
    color: '#1890ff',
  },
  {
    key: 'jurisprudences',
    icon: <FileSearchOutlined style={{ color: '#faad14' }} />,
    label: 'Buscar jurisprudências',
    description: 'Busque jurisprudências com base no seu documento',
    color: '#faad14',
  },
  {
    key: 'fullAnalysis',
    icon: <FormOutlined style={{ color: '#f5222d' }} />,
    label: 'Análise Completa',
    description: 'Gere uma análise completa do seu documento',
    color: '#f5222d',
  },
  {
    key: 'riskAnalysis',
    icon: <EditOutlined style={{ color: '#52c41a' }} />,
    label: 'Análise de Riscos',
    description: 'Elaborar uma análise de riscos com base no seu documento',
    color: '#52c41a',
  }
];

export const getPromptClasses = (windowWidth: number): Partial<Record<SemanticType, string>> => ({
  title: 'text-center font-bold mb-4 text-lg',
  list: windowWidth < breakpoint ? 'flex items-center! flex-col gap-2' : 'flex flex-row items-center gap-4',
  item: windowWidth < breakpoint ? 'w-[85%] shadow-md m-1 select-none' : 'w-[25vw] shadow-md my-4 mx-1 select-none',
});

export const promptClassNames: Partial<Record<SemanticType, string>> = {};