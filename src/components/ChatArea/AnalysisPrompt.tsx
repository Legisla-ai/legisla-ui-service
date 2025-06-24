// src/components/ChatArea/AnalysisPrompt.tsx
import { truncateFileName } from './utils';

interface AnalysisPromptProps {
  readonly fileName: string;
  readonly children: React.ReactNode;
}

export function AnalysisPrompt({ fileName, children }: AnalysisPromptProps) {
  return (
    <div className="w-full overflow-hidden">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Perfeito! Como posso ajudar com este documento?
        </h3>
        <p className="text-gray-600 mb-1 font-medium">
          {truncateFileName(fileName, 60)}
        </p>
        <p className="text-sm text-gray-500">
          Selecione o tipo de análise jurídica que melhor atende sua necessidade
        </p>
      </div>
      
      {children}
    </div>
  );
}
