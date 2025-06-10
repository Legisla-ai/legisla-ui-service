import { FileTextOutlined, SearchOutlined, BarChartOutlined, BookOutlined } from '@ant-design/icons';
import type { PromptsProps } from '@ant-design/x';
import { SemanticType } from '@ant-design/x/es/prompts';

export const completeAnalysisPromptsItems: PromptsProps['items'] = [
  {
    key: 'structuralAnalysis',
    icon: <FileTextOutlined style={{ color: '#1890ff' }} />,
    label: 'Análise Estrutural',
    description: 'Analisar a estrutura e organização do documento',
  },
  {
    key: 'contentAnalysis',
    icon: <SearchOutlined style={{ color: '#52c41a' }} />,
    label: 'Análise de Conteúdo',
    description: 'Examinar o conteúdo jurídico em detalhes',
  },
  {
    key: 'complianceAnalysis',
    icon: <BarChartOutlined style={{ color: '#faad14' }} />,
    label: 'Análise de Conformidade',
    description: 'Verificar conformidade legal e regulatória',
  },
  {
    key: 'recommendationsAnalysis',
    icon: <BookOutlined style={{ color: '#f5222d' }} />,
    label: 'Recomendações',
    description: 'Gerar recomendações e sugestões de melhoria',
  },
];

export const getCompleteAnalysisPromptClasses = (windowWidth: number, isSidebarOpen: boolean = false): Partial<Record<SemanticType, string>> => {
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
      : 'w-[260px] max-w-[280px] shadow-md my-4 mx-2 select-none flex-shrink-0',
  };
};

export const completeAnalysisPromptClassNames: Partial<Record<SemanticType, string>> = {};
