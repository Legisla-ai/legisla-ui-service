// src/components/ChatArea/ChatActionsArea.tsx
import { ANALYSIS_OPTIONS } from './constants';

interface ChatActionsAreaProps {
  readonly usedAnalyses: Set<string>;
  readonly isSubmitting: boolean;
  readonly onAnalysisRequest: (promptKey: string) => void;
}

export function ChatActionsArea({ usedAnalyses, isSubmitting, onAnalysisRequest }: ChatActionsAreaProps) {
  return (
    <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-700">Análises disponíveis:</p>
        <span className="text-xs text-gray-500">
          {usedAnalyses.size} de {ANALYSIS_OPTIONS.length} realizadas
        </span>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {ANALYSIS_OPTIONS.map((option) => (
          <button
            key={option.action}
            onClick={() => onAnalysisRequest(option.action)}
            disabled={isSubmitting || usedAnalyses.has(option.action)}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
              usedAnalyses.has(option.action)
                ? 'text-green-700 bg-green-50 border border-green-200 cursor-default'
                : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            <span className="text-lg group-hover:scale-110 transition-transform">
              {option.icon}
            </span>
            <span className="font-medium">
              {option.title}
            </span>
            {usedAnalyses.has(option.action) && (
              <span className="text-xs opacity-75">• Concluído</span>
            )}
          </button>
        ))}
      </div>
      
      {usedAnalyses.size === ANALYSIS_OPTIONS.length && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-green-600">🎉</span>
            <span className="text-sm text-green-800 font-medium">
              Todas as análises foram concluídas! Faça upload de um novo documento para continuar.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
