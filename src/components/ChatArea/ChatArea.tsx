// src/components/ChatArea/ChatArea.tsx
import { FileUploadArea } from './FileUploadArea';
import { FileDisplayCard } from './FileDisplayCard';
import { AnalysisPrompt } from './AnalysisPrompt';
import { ChatView } from './ChatView';
import { LoadingSteps } from './LoadingSteps';
import { AnalysisOptions } from './AnalysisOptions';
import { DuplicateFileModal } from './DuplicateFileModal';
import { useChatState } from '@/hooks/useChatState';
import { useAnalysisHandler } from '@/hooks/useAnalysisHandler';

export function ChatArea() {
  const {
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
    duplicateCheck,
    addMessage,
    processFile,
    forceUpload,
    resetAllStates,
    resetDuplicateCheck,
    handleReplace,
    setLoadingStep,
    setIsSubmitting,
    setChatStarted,
    setUsedAnalyses,
  } = useChatState();

  const { handleAnalysisRequest } = useAnalysisHandler();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
    e.target.value = '';
  };

  const onAnalysisRequest = async (promptKey: string) => {
    await handleAnalysisRequest(promptKey, {
      currentFile,
      currentRepositoryId,
      usedAnalyses,
      isSubmitting,
      setIsSubmitting,
      setLoadingStep,
      addMessage,
      setUsedAnalyses,
      setChatStarted,
      chatStarted,
    });
  };

  const renderAnalysisArea = () => {
    if (isSubmitting || isCreatingRepository) {
      return <LoadingSteps currentStep={loadingStep} isWaitingForResponse={loadingStep === 3} />;
    }

    return (
      <AnalysisOptions
        onAnalysisRequest={onAnalysisRequest}
        usedAnalyses={usedAnalyses}
        isSubmitting={isSubmitting || isCreatingRepository}
      />
    );
  };

  const renderInitialInterface = () => {
    // Cenário 1: Nenhum arquivo ou repositório - mostrar upload
    if (!currentFile && !currentRepositoryId) {
      return <FileUploadArea onFileSelect={processFile} isSubmitting={isSubmitting || isCreatingRepository} />;
    }

    // Cenário 2: Arquivo selecionado - mostrar card do arquivo + opções
    if (currentFile) {
      return (
        <>
          <FileDisplayCard file={currentFile} onReplace={handleReplace} onRemove={resetAllStates} />
          <AnalysisPrompt fileName={currentFile.name}>{renderAnalysisArea()}</AnalysisPrompt>
        </>
      );
    }

    // Cenário 3: Repositório sem arquivo - só mostrar opções de análise
    if (currentRepositoryId) {
      return <AnalysisPrompt fileName={`Repositório ${currentRepositoryId}`}>{renderAnalysisArea()}</AnalysisPrompt>;
    }

    return null;
  };

  return (
    <div className="flex items-center justify-center h-full bg-gray-50 w-full overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-700/5 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={hiddenInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.rtf,.odt"
      />

      {isLoadingHistory && (
        <div className="flex flex-col items-center justify-center space-y-4 relative">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
          <p className="text-gray-600 text-sm">Carregando histórico do repositório...</p>
        </div>
      )}

      {/* **Indicador de Erro**: Feedback em caso de falha no carregamento */}
      {historyError && !isLoadingHistory && (
        <div className="flex flex-col items-center justify-center space-y-4 relative">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
            <p className="text-red-700 text-sm text-center">Erro ao carregar histórico: {historyError.message}</p>
          </div>
        </div>
      )}

      {/* **Conteúdo Principal**: Só renderiza quando não está carregando histórico */}
      {!isLoadingHistory && !historyError && (
        <>
          {!chatStarted ? (
            // Initial screen - file upload and analysis selection
            <div className="flex flex-col items-center transition-all duration-700 ease-out w-full max-w-5xl px-8 relative">
              {renderInitialInterface()}
            </div>
          ) : (
            <ChatView
              messages={messages}
              usedAnalyses={usedAnalyses}
              isSubmitting={isSubmitting || isCreatingRepository}
              onAnalysisRequest={onAnalysisRequest}
            />
          )}
        </>
      )}

      <DuplicateFileModal
        isOpen={duplicateCheck.hasDuplicate}
        suggestion={duplicateCheck.suggestion ?? ''}
        onConfirm={() => {
          if (currentFile) {
            forceUpload(currentFile);
          }
        }}
        onCancel={() => {
          resetDuplicateCheck();
          resetAllStates();
        }}
        isLoading={isCreatingRepository}
      />
    </div>
  );
}
