// src/components/ChatArea/AnalysisOptions.tsx
import React from 'react';
import { ANALYSIS_OPTIONS } from './constants';

interface AnalysisOptionsProps {
  onAnalysisRequest: (action: string) => void;
  usedAnalyses: Set<string>;
  isSubmitting: boolean;
}

export const AnalysisOptions: React.FC<AnalysisOptionsProps> = ({ 
  onAnalysisRequest, 
  usedAnalyses, 
  isSubmitting 
}) => {
  const getButtonClasses = (isUsed: boolean, isSubmitting: boolean) => {
    if (isUsed) {
      return 'border-green-200 bg-green-50 cursor-not-allowed';
    }
    if (isSubmitting) {
      return 'border-gray-200 bg-gray-50 cursor-not-allowed';
    }
    return 'border-gray-200 bg-white hover:border-cyan-400 hover:bg-gray-50 cursor-pointer';
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ANALYSIS_OPTIONS.map((option) => {
          const isUsed = usedAnalyses.has(option.action);
          const isDisabled = isSubmitting || isUsed;
          
          return (
            <button
              key={option.action}
              onClick={() => !isDisabled && onAnalysisRequest(option.action)}
              disabled={isDisabled}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-300 text-left
                ${getButtonClasses(isUsed, isSubmitting)}
              `}
            >
              {isUsed && (
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{option.icon}</span>
                <div className="flex-1">
                  <h3 className={`font-semibold text-sm mb-1 ${isUsed ? 'text-green-700' : 'text-gray-900'}`}>
                    {option.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isUsed ? 'text-green-600' : 'text-gray-600'}`}>
                    {option.description}
                  </p>
                  {isUsed && (
                    <p className="text-xs text-green-600 font-medium mt-2">
                      ✓ Análise concluída
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
