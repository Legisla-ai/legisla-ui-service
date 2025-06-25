// src/components/ChatArea/hooks/useAnalysisHandler.ts
import { useState, useCallback } from 'react';
import { analyzeDocument } from '@/services/documentAnalysisService';
import { getActionTitle } from '../utils';

interface RetryState {
  count: number;
  maxRetries: number;
  isRetrying: boolean;
}

export function useAnalysisHandler() {
  const [retryState, setRetryState] = useState<RetryState>({
    count: 0,
    maxRetries: 3,
    isRetrying: false
  });

  const resetRetryState = useCallback(() => {
    setRetryState(prev => ({ ...prev, count: 0, isRetrying: false }));
  }, []);

  // Função para extrair conteúdo da resposta da API
  const extractResponseContent = useCallback((response: any): string => {
    if (response.content && Array.isArray(response.content) && response.content[0]?.text) {
      return response.content[0].text;
    }
    if (response.content && typeof response.content === 'string') {
      return response.content;
    }
    if (response.analysis) {
      return response.analysis;
    }
    return 'Análise concluída com sucesso.';
  }, []);

  // Função para validar pré-requisitos da análise
  const validateAnalysisRequest = useCallback((
    currentFile: File | null,
    currentRepositoryId: number | null,
    usedAnalyses: Set<string>,
    promptKey: string,
    isSubmitting: boolean,
    isRetry: boolean,
    addMessage: (content: string, isUser?: boolean) => void
  ): boolean => {
    if (!currentFile && !currentRepositoryId) {
      addMessage('Erro: Nenhum arquivo ou repositório foi selecionado para análise.', false);
      return false;
    }

    if (usedAnalyses.has(promptKey)) {
      addMessage('Esta análise já foi realizada anteriormente.', false);
      return false;
    }

    if (isSubmitting && !isRetry) {
      return false;
    }

    return true;
  }, []);

  // Função para configurar timers de loading
  const setupLoadingTimers = useCallback((setLoadingStep: (step: number) => void) => {
    const step2Timer = setTimeout(() => setLoadingStep(2), 2000);
    const step3Timer = setTimeout(() => setLoadingStep(3), 4000);
    return { step2Timer, step3Timer };
  }, []);

  // Função para lidar com retry
  const handleRetry = useCallback((
    error: unknown,
    retryState: RetryState,
    isRetry: boolean,
    promptKey: string,
    params: any,
    addMessage: (content: string, isUser?: boolean) => void,
    handleAnalysisRequest: any
  ) => {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    
    if (retryState.count < retryState.maxRetries && !isRetry) {
      setRetryState(prev => ({ ...prev, count: prev.count + 1 }));
      setTimeout(() => {
        handleAnalysisRequest(promptKey, params, true);
      }, 3000);
      addMessage(`Erro temporário: ${errorMessage}. Tentando novamente automaticamente...`, false);
    } else {
      addMessage(`Erro: ${errorMessage}. Tente novamente.`, false);
      resetRetryState();
    }
  }, [resetRetryState]);

  const handleAnalysisRequest = async (
    promptKey: string,
    params: {
      currentFile: File | null;
      currentRepositoryId?: number | null;
      usedAnalyses: Set<string>;
      isSubmitting: boolean;
      setIsSubmitting: (value: boolean) => void;
      setLoadingStep: (step: number) => void;
      addMessage: (content: string, isUser?: boolean) => void;
      setUsedAnalyses: (updater: (prev: Set<string>) => Set<string>) => void;
      setChatStarted: (started: boolean) => void;
      chatStarted: boolean;
    },
    isRetry: boolean = false
  ) => {
    const {
      currentFile,
      currentRepositoryId,
      usedAnalyses,
      isSubmitting,
      setIsSubmitting,
      setLoadingStep,
      addMessage,
      setUsedAnalyses,
      setChatStarted,
      chatStarted
    } = params;

    // Validar pré-requisitos
    if (!validateAnalysisRequest(
      currentFile,
      currentRepositoryId ?? null,
      usedAnalyses,
      promptKey,
      isSubmitting,
      isRetry,
      addMessage
    )) {
      return;
    }

    setIsSubmitting(true);
    setLoadingStep(1);
    
    if (!isRetry) {
      resetRetryState();
      const actionTitle = getActionTitle(promptKey);
      addMessage(actionTitle, true);
    } else {
      setRetryState(prev => ({ ...prev, isRetrying: true }));
      addMessage(`🔄 Tentativa ${retryState.count + 1} de ${retryState.maxRetries}...`, false);
    }

    // Configurar timers de loading
    const { step2Timer, step3Timer } = setupLoadingTimers(setLoadingStep);

    try {
      // Criar arquivo para análise
      const fileToAnalyze = currentFile ?? new File([''], `repository-${currentRepositoryId}`, { type: 'text/plain' });
      
      const response = await analyzeDocument({
        file: fileToAnalyze,
        promptType: promptKey,
      });
      
      // Extrair e adicionar conteúdo da resposta
      const responseContent = extractResponseContent(response);
      addMessage(responseContent, false);
      
      setUsedAnalyses(prev => new Set([...prev, promptKey]));
      resetRetryState();
      
      if (!chatStarted) {
        setChatStarted(true);
      }
    } catch (error) {
      handleRetry(error, retryState, isRetry, promptKey, params, addMessage, handleAnalysisRequest);
    } finally {
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
      setIsSubmitting(false);
      setLoadingStep(1);
      setRetryState(prev => ({ ...prev, isRetrying: false }));
    }
  };

  return {
    handleAnalysisRequest,
    retryState,
    resetRetryState,
  };
}
