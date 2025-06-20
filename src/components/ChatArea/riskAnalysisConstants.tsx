import { ExclamationCircleOutlined, CheckOutlined, AlertOutlined, SafetyOutlined } from '@ant-design/icons';
import type { PromptsProps } from '@ant-design/x';
import { SemanticType } from '@ant-design/x/es/prompts';

export const riskAnalysisPromptsItems: PromptsProps['items'] = [
  {
    key: 'legalRisks',
    icon: <ExclamationCircleOutlined style={{ color: '#f5222d' }} />,
    label: 'Riscos Legais',
    description: 'Identificar potenciais riscos jurídicos',
  },
  {
    key: 'complianceRisks',
    icon: <CheckOutlined style={{ color: '#faad14' }} />,
    label: 'Riscos de Conformidade',
    description: 'Avaliar riscos de não conformidade',
  },
  {
    key: 'operationalRisks',
    icon: <AlertOutlined style={{ color: '#fa8c16' }} />,
    label: 'Riscos Operacionais',
    description: 'Analisar riscos operacionais do documento',
  },
  {
    key: 'mitigationPlan',
    icon: <SafetyOutlined style={{ color: '#52c41a' }} />,
    label: 'Plano de Mitigação',
    description: 'Criar estratégias para mitigar riscos identificados',
  },
];

export const getRiskAnalysisPromptClasses = (
  windowWidth: number,
  isSidebarOpen: boolean = false
): Partial<Record<SemanticType, string>> => {
  const sidebarWidth = isSidebarOpen ? 256 : 0;
  const availableWidth = windowWidth - sidebarWidth;

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

export const riskAnalysisPromptClassNames: Partial<Record<SemanticType, string>> = {};
