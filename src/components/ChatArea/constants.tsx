// src/components/ChatArea/constants.ts
import { FileTextOutlined, EditOutlined, FormOutlined } from '@ant-design/icons';
import type { PromptsProps } from '@ant-design/x';
import { SemanticType } from '@ant-design/x/es/prompts';

export interface AnalysisOption {
  title: string;
  description: string;
  icon: string;
  action: string;
  shortDescription?: string;
}

export const ANALYSIS_OPTIONS: AnalysisOption[] = [
  {
    title: 'Resumir Documento',
    description: 'Obtenha um resumo claro e conciso dos pontos principais',
    shortDescription: 'Resumo executivo',
    icon: '📄',
    action: 'summarize'
  },
  {
    title: 'Análise de Riscos',
    description: 'Identifique possíveis riscos jurídicos e pontos de atenção',
    shortDescription: 'Identificação de riscos',
    icon: '⚠️',
    action: 'riskAnalysis'
  },
  {
    title: 'Análise Completa',
    description: 'Análise jurídica detalhada e abrangente do documento',
    shortDescription: 'Análise detalhada',
    icon: '📊',
    action: 'fullAnalysis'
  }
];

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

export const getPromptClasses = (
  windowWidth: number,
  isSidebarOpen: boolean = false
): Partial<Record<SemanticType, string>> => {
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

// Mensagens motivacionais para o loading (mais simples)
export const LOADING_MESSAGES = [
  "Processando seu documento com cuidado...",
  "Analisando aspectos jurídicos relevantes...",
  "Preparando insights personalizados...",
] as const;

// Função para obter mensagem aleatória
export const getRandomLoadingMessage = (): string => {
  const randomIndex = Math.floor(Math.random() * LOADING_MESSAGES.length);
  return LOADING_MESSAGES[randomIndex];
};
