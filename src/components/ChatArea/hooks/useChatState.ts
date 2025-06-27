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

  useEffect(() => {
    const selectedId = repositoryContext?.selectedRepositoryId;
    
    if (selectedId && !isLoadingHistory && currentRepositoryId !== selectedId) {
      setCurrentFile(null);
      setCurrentRepositoryId(selectedId);
      setUsedAnalyses(new Set());
      setLoadingStep(1);
      setIsSubmitting(false);
      setIsCreatingRepository(false);
      
      if (chatHistory.length > 0) {
        setMessages(chatHistory);
        setChatStarted(true);
      } else {
        setMessages([]);
        setChatStarted(true);
      }
    }
  }, [chatHistory, repositoryContext?.selectedRepositoryId, currentRepositoryId, isLoadingHistory]);

  useEffect(() => {
    const selectedId = repositoryContext?.selectedRepositoryId;
    
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
      if (repositoryContext.currentRepositoryId !== selectedId) {
        repositoryContext.setCurrentRepositoryId(selectedId);
      }
    } else if (selectedId === null && currentRepositoryId === null) {
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
    
    addMessage,
    processFile,
    forceUpload,
    resetAllStates,
    resetIncludingSidebar,
    handleReplace,
    resetDuplicateCheck: duplicateCheck.resetCheck,
    confirmDuplicateUpload: duplicateCheck.confirmDuplicateUpload,
    
    setLoadingStep,
    setIsSubmitting,
    setChatStarted,
    setUsedAnalyses,
  };
}
