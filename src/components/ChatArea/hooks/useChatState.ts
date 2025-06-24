// src/components/ChatArea/hooks/useChatState.ts
import { useState, useRef } from 'react';
import type { ChatMessageType } from '../types';
import { createMessage } from '../utils';

/**
 * Hook customizado para gerenciar estado do chat
 * 
 * **Melhorias:**
 * - Separação de lógica: estados e funções de negócio isolados
 * - Reutilizável: pode ser usado em outros componentes de chat
 * - Testabilidade: lógica pode ser testada independentemente
 * - Single Responsibility: apenas gerencia estado do chat
 */
export function useChatState() {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [loadingStep, setLoadingStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [usedAnalyses, setUsedAnalyses] = useState<Set<string>>(new Set());
  
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const addMessage = (content: string, isUser: boolean = false) => {
    const newMessage = createMessage(content, isUser);
    setMessages(prev => [...prev, newMessage]);
  };

  const processFile = (file: File) => {
    if (isSubmitting) return;
    
    // Reset states when new file is processed
    setChatStarted(false);
    setMessages([]);
    setUsedAnalyses(new Set());
    setCurrentFile(file);
  };

  const resetAllStates = () => {
    setCurrentFile(null);
    setLoadingStep(1);
    setIsSubmitting(false);
    setChatStarted(false);
    setMessages([]);
    setUsedAnalyses(new Set());
  };

  const handleReplace = () => {
    resetAllStates();
    hiddenInputRef.current?.click();
  };

  return {
    // States
    currentFile,
    loadingStep,
    isSubmitting,
    chatStarted,
    messages,
    usedAnalyses,
    hiddenInputRef,
    
    // Actions
    addMessage,
    processFile,
    resetAllStates,
    handleReplace,
    
    // Setters (for external control)
    setLoadingStep,
    setIsSubmitting,
    setChatStarted,
    setUsedAnalyses,
  };
}
