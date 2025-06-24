// src/components/ChatArea/hooks/useAnalysisHandler.ts
import { analyzeDocument } from '@/services/documentAnalysisService';
import { getActionTitle } from '../utils';

/**
 * Hook para gerenciar operações de análise de documentos
 * 
 * **Melhorias:**
 * - Separação de responsabilidade: apenas lógica de análise
 * - Reutilizável: pode ser usado em diferentes contextos
 * - Testabilidade: lógica de análise isolada e testável
 * - Error handling: tratamento centralizado de erros
 * - Integração com API real: removidos dados mockados
 */
export function useAnalysisHandler() {
  // Analysis request handler using real API
  const handleAnalysisRequest = async (
    promptKey: string,
    params: {
      currentFile: File | null;
      usedAnalyses: Set<string>;
      isSubmitting: boolean;
      setIsSubmitting: (value: boolean) => void;
      setLoadingStep: (step: number) => void;
      addMessage: (content: string, isUser?: boolean) => void;
      setUsedAnalyses: (updater: (prev: Set<string>) => Set<string>) => void;
      setChatStarted: (started: boolean) => void;
      chatStarted: boolean;
    }
  ) => {
    const {
      currentFile,
      usedAnalyses,
      isSubmitting,
      setIsSubmitting,
      setLoadingStep,
      addMessage,
      setUsedAnalyses,
      setChatStarted,
      chatStarted
    } = params;

    if (!currentFile || usedAnalyses.has(promptKey) || isSubmitting) return;

    setIsSubmitting(true);
    setLoadingStep(1);
    const actionTitle = getActionTitle(promptKey);
    
    // Add user message
    addMessage(`${actionTitle} do documento`, true);

    // Progressive loading steps with realistic timing
    setTimeout(() => setLoadingStep(2), 2000);
    setTimeout(() => setLoadingStep(3), 4000);

    try {
      // Real API call to document analysis service
      const response = await analyzeDocument({
        file: currentFile,
        promptType: promptKey,
      });
      
      // Format and add the response
      addMessage(response.content ?? response.analysis ?? 'Análise concluída com sucesso.', false);
      
      setUsedAnalyses(prev => new Set([...prev, promptKey]));
      
      if (!chatStarted) {
        setChatStarted(true);
      }
    } catch (error) {
      console.error('Erro durante a análise:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      addMessage(`Erro: ${errorMessage}. Tente novamente.`, false);
    } finally {
      setIsSubmitting(false);
      setLoadingStep(1);
    }
  };

  return {
    handleAnalysisRequest,
  };
}
