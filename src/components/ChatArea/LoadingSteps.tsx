// src/components/ChatArea/LoadingSteps.tsx
import React from 'react';

interface LoadingStepsProps {
  currentStep: number;
  isWaitingForResponse?: boolean;
}

export const LoadingSteps: React.FC<LoadingStepsProps> = ({ currentStep, isWaitingForResponse = false }) => {
  const steps = [
    { id: 1, title: 'Lendo documento', description: 'Extraindo e processando conteúdo' },
    { id: 2, title: 'Analisando conteúdo', description: 'Aplicando análise jurídica' },
    { id: 3, title: 'Gerando resposta', description: 'Preparando insights personalizados' },
  ];

  const getStepState = (stepId: number) => {
    if (currentStep > stepId) {
      return 'completed';
    }
    if (currentStep === stepId) {
      if (stepId === steps.length && isWaitingForResponse) {
        return 'waiting';
      }
      return 'active';
    }
    return 'pending';
  };

  const renderStepIndicator = (stepState: string) => {
    if (stepState === 'completed') {
      return (
        <div className="w-16 h-16 bg-gray-100 border-2 border-gray-300 rounded-full flex items-center justify-center transition-all duration-700 ease-out shadow-sm opacity-60">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      );
    }

    if (stepState === 'active' || stepState === 'waiting') {
      return (
        <div className="w-16 h-16 border-2 border-cyan-400 rounded-full flex items-center justify-center transition-all duration-700 ease-out bg-cyan-50">
          <div className="w-8 h-8 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
        </div>
      );
    }

    return (
      <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center transition-all duration-700 ease-out bg-gray-50">
        <div className="w-10 h-2 bg-gray-300 rounded-full"></div>
      </div>
    );
  };

  const getTitleStyles = (stepState: string) => {
    if (stepState === 'completed') {
      return 'text-gray-500 font-medium opacity-70';
    }
    if (stepState === 'active' || stepState === 'waiting') {
      return 'text-gray-900 font-bold';
    }
    return 'text-gray-500 font-medium';
  };

  const getDescriptionStyles = (stepState: string) => {
    if (stepState === 'completed') {
      return 'text-gray-400 opacity-60';
    }
    if (stepState === 'active' || stepState === 'waiting') {
      return 'text-gray-700';
    }
    return 'text-gray-400';
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 mx-4">
      <div className="w-full max-w-4xl px-8">
        {/* Steps Layout Horizontal */}
        <div className="flex items-start justify-between relative">
          {steps.map((step) => {
            const stepState = getStepState(step.id);

            return (
              <div key={step.id} className="flex flex-col items-center flex-1 relative z-10">
                {/* Step Indicator */}
                <div className="relative mb-6 flex items-center justify-center h-20">
                  {renderStepIndicator(stepState)}
                </div>

                {/* Step Content */}
                <div className="text-center max-w-[220px]">
                  <h4 className={`text-base mb-2 transition-all duration-500 ${getTitleStyles(stepState)}`}>
                    {step.title}
                  </h4>
                  <p
                    className={`text-sm leading-relaxed transition-all duration-500 ${getDescriptionStyles(stepState)}`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
