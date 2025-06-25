// src/components/ChatArea/hooks/useChatState.ts
import { useState, useRef, useEffect } from 'react';
import type { ChatMessageType } from '../types';
import { createMessage } from '../utils';
import { RepositoryService } from '@/services/repositoryService';
import { RepositoryHistoryService } from '@/services/repositoryHistoryService';
import { useRepositoryOptional } from '@/context/useRepositoryHooks';
import { useRepositoryChatHistory, useInvalidateRepositoryHistory } from '@/hooks/useRepositoryHistory';
import { useDuplicateFileCheck } from '@/hooks/useDuplicateFileCheck';


export function useChatState() {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [currentRepositoryId, setCurrentRepositoryId] = useState<number | null>(null);
  const [loadingStep, setLoadingStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatingRepository, setIsCreatingRepository] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [usedAnalyses, setUsedAnalyses] = useState<Set<string>>(new Set());
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  
  const repositoryContext = useRepositoryOptional();
  const invalidateRepositoryHistory = useInvalidateRepositoryHistory();
  const duplicateCheck = useDuplicateFileCheck();

  const { 
    data: chatHistory = [], 
    isLoading: isLoadingHistory,
    error: historyError 
  } = useRepositoryChatHistory({ 
    repositoryId: repositoryContext?.selectedRepositoryId ?? null 
  });

  // Função para criar um arquivo virtual quando um repositório é selecionado
  const createVirtualFile = (repositoryName: string): File => {
    const blob = new Blob(['Virtual file for repository analysis'], { type: 'text/plain' });
    return new File([blob], repositoryName, { type: 'text/plain' });
  };

  useEffect(() => {
    const selectedId = repositoryContext?.selectedRepositoryId;
    
    if (selectedId && chatHistory.length > 0 && currentRepositoryId !== selectedId) {
      // Criar arquivo virtual baseado no nome do repositório para permitir análises
      const repositoryName = repositoryContext?.repositoryName ?? `repository-${selectedId}`;
      const virtualFile = createVirtualFile(repositoryName);
      
      setCurrentFile(virtualFile);
      setCurrentRepositoryId(selectedId);
      setMessages(chatHistory);
      setChatStarted(true);
      setUsedAnalyses(new Set());
      setLoadingStep(1);
      setIsSubmitting(false);
      setIsCreatingRepository(false);
    }
  }, [chatHistory, repositoryContext?.selectedRepositoryId, currentRepositoryId]);

  useEffect(() => {
    const selectedId = repositoryContext?.selectedRepositoryId;
    
    if (selectedId && 
        chatHistory.length === 0 && 
        !isLoadingHistory && 
        !historyError && 
        currentRepositoryId !== selectedId) {
      // Criar arquivo virtual baseado no nome do repositório para permitir análises
      const repositoryName = repositoryContext?.repositoryName ?? `repository-${selectedId}`;
      const virtualFile = createVirtualFile(repositoryName);
      
      setCurrentFile(virtualFile);
      setCurrentRepositoryId(selectedId);
      setMessages([]);
      setChatStarted(true);
      setUsedAnalyses(new Set());
    }
  }, [repositoryContext?.selectedRepositoryId, chatHistory.length, isLoadingHistory, historyError, currentRepositoryId]);

  useEffect(() => {
    const selectedId = repositoryContext?.selectedRepositoryId;
    
    // Só reseta se explicitamente o selectedRepositoryId for null 
    // E tivermos um repositório atual (evita reset durante upload de novo arquivo)
    if (selectedId === null && currentRepositoryId !== null && !isCreatingRepository) {
      setCurrentFile(null);
      setCurrentRepositoryId(null);
      setMessages([]);
      setChatStarted(false);
      setUsedAnalyses(new Set());
      setLoadingStep(1);
      setIsSubmitting(false);
      setIsCreatingRepository(false);
    }
  }, [repositoryContext?.selectedRepositoryId, currentRepositoryId, isCreatingRepository]);

  useEffect(() => {
    if (!repositoryContext) return;
    
    const selectedId = repositoryContext.selectedRepositoryId;
    
    if (selectedId && selectedId === currentRepositoryId) {
      // Atualizar contexto global com dados do repositório selecionado
      if (repositoryContext.currentRepositoryId !== selectedId) {
        repositoryContext.setCurrentRepositoryId(selectedId);
      }
    } else if (selectedId === null && currentRepositoryId === null) {
      // Limpar contexto quando necessário
      if (repositoryContext.currentRepositoryId !== null) {
        repositoryContext.setCurrentRepositoryId(null);
      }
      if (repositoryContext.repositoryName !== '') {
        repositoryContext.setRepositoryName('');
      }
    }
  }, [repositoryContext?.selectedRepositoryId, currentRepositoryId]);

  useEffect(() => {
    if (historyError) {
      const errorMessage = createMessage(
        'Erro ao carregar histórico do chat. Tentando novamente...',
        false
      );
      setMessages(prev => [...prev, errorMessage]);
    }
  }, [historyError]);

  const addMessage = (content: string, isUser: boolean = false) => {
    const newMessage = createMessage(content, isUser);
    setMessages(prev => [...prev, newMessage]);
  };

  const processFile = async (file: File, skipDuplicateCheck: boolean = false) => {
    if (isSubmitting || isCreatingRepository) {
      return;
    }

    if (!skipDuplicateCheck) {
      try {
        const duplicateResult = await duplicateCheck.checkDuplicate(file);
        
        if (duplicateResult.isDuplicate) {
          return;
        }
      } catch (error) {
        console.warn('Erro na verificação de duplicatas, prosseguindo com upload:', error);
      }
    }
    
    setChatStarted(false);
    setMessages([]);
    setUsedAnalyses(new Set());
    setCurrentFile(file);
    setCurrentRepositoryId(null);
    setIsCreatingRepository(true);

    try {
      const repository = await RepositoryService.createRepository(file);
      setCurrentRepositoryId(repository.id);

      if (repositoryContext) {
        repositoryContext.setCurrentRepositoryId(repository.id);
        repositoryContext.setRepositoryName(repository.name ?? file.name);
        repositoryContext.setSelectedRepositoryId(repository.id);
      }
      
      invalidateRepositoryHistory();
      RepositoryHistoryService.onRepositoryCreated({
        id: repository.id,
        name: repository.name ?? file.name
      });
      
      duplicateCheck.resetCheck();
    } catch (error) {
      console.error('Erro ao criar repositório:', error);
      setCurrentFile(null);
      
      if (repositoryContext) {
        repositoryContext.setCurrentRepositoryId(null);
        repositoryContext.setRepositoryName('');
      }
      
      addMessage('Erro ao processar o arquivo. Tente novamente.', false);
    } finally {
      setIsCreatingRepository(false);
    }
  };

  const resetAllStates = () => {
    setCurrentFile(null);
    setCurrentRepositoryId(null);
    setLoadingStep(1);
    setIsSubmitting(false);
    setIsCreatingRepository(false);
    setChatStarted(false);
    setMessages([]);
    setUsedAnalyses(new Set());
    
    duplicateCheck.resetCheck();
    
    if (repositoryContext) {
      repositoryContext.setCurrentRepositoryId(null);
      repositoryContext.setRepositoryName('');
    }
  };

  const forceUpload = async (file: File) => {
    await processFile(file, true);
  };

  const handleReplace = () => {
    resetAllStates();
    hiddenInputRef.current?.click();
  };

  const resetIncludingSidebar = () => {
    resetAllStates();
    if (repositoryContext) {
      repositoryContext.setSelectedRepositoryId(null);
    }
  };

  return {
    // States
    currentFile,
    currentRepositoryId,
    loadingStep,
    isSubmitting,
    isCreatingRepository,
    chatStarted,
    messages,
    usedAnalyses,
    hiddenInputRef,
    isLoadingHistory,
    historyError,
    
    duplicateCheck: {
      isChecking: duplicateCheck.isChecking,
      hasDuplicate: duplicateCheck.hasDuplicate,
      canProceed: duplicateCheck.canProceed,
      isReady: duplicateCheck.isReady,
      suggestion: duplicateCheck.duplicateResult?.suggestion,
      existingRepository: duplicateCheck.duplicateResult?.existingRepository,
      error: duplicateCheck.error,
    },
    
    // Actions
    addMessage,
    processFile,
    forceUpload,
    resetAllStates,
    resetIncludingSidebar,
    handleReplace,
    resetDuplicateCheck: duplicateCheck.resetCheck,
    confirmDuplicateUpload: duplicateCheck.confirmDuplicateUpload,
    
    // Setters (for external control)
    setLoadingStep,
    setIsSubmitting,
    setChatStarted,
    setUsedAnalyses,
  };
}
