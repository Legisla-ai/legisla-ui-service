// src/components/ChatArea/ChatArea.tsx
// DEVELOPMENT MODE: Using mock responses to avoid API costs during testing
// Remove mockAnalyzeDocument function and restore real API calls before production
import { FileUploadArea } from './FileUploadArea';
import { FileDisplayCard } from './FileDisplayCard';
import { AnalysisPrompt } from './AnalysisPrompt';
import { ChatView } from './ChatView';
import { LoadingSteps } from './LoadingSteps';
import { AnalysisOptions } from './AnalysisOptions';
import type { ChatAreaProps } from './types';
import { useChatState } from './hooks/useChatState';
import { useAnalysisHandler } from './hooks/useAnalysisHandler';

export function ChatArea({ mode: _mode = 'repository', isSidebarOpen: _isSidebarOpen = false }: Readonly<ChatAreaProps>) {
  const {
    currentFile,
    loadingStep,
    isSubmitting,
    chatStarted,
    messages,
    usedAnalyses,
    hiddenInputRef,
    addMessage,
    processFile,
    resetAllStates,
    handleReplace,
    setLoadingStep,
    setIsSubmitting,
    setChatStarted,
    setUsedAnalyses,
  } = useChatState();

  const { handleAnalysisRequest } = useAnalysisHandler();

  // Handle file selection from hidden input
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    e.target.value = '';
  };

  // Wrapper for analysis request to pass all required parameters
  const onAnalysisRequest = async (promptKey: string) => {
    await handleAnalysisRequest(promptKey, {
      currentFile,
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
    if (isSubmitting) {
      return <LoadingSteps currentStep={loadingStep} isWaitingForResponse={loadingStep === 3} />;
    }
    
    return (
      <AnalysisOptions 
        onAnalysisRequest={onAnalysisRequest}
        usedAnalyses={usedAnalyses}
        isSubmitting={isSubmitting}
      />
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 w-full overflow-hidden relative">
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

      {!chatStarted ? (
        // Initial screen - file upload and analysis selection
        <div className="flex flex-col items-center transition-all duration-700 ease-out w-full max-w-5xl px-8 relative z-10">
          {!currentFile ? (
            <FileUploadArea 
              onFileSelect={processFile}
              isSubmitting={isSubmitting}
            />
          ) : (
            <>
              <FileDisplayCard
                file={currentFile}
                onReplace={handleReplace}
                onRemove={resetAllStates}
              />

              <AnalysisPrompt fileName={currentFile.name}>
                {renderAnalysisArea()}
              </AnalysisPrompt>
            </>
          )}
        </div>
      ) : (
        <ChatView
          currentFile={currentFile}
          messages={messages}
          usedAnalyses={usedAnalyses}
          isSubmitting={isSubmitting}
          onAnalysisRequest={onAnalysisRequest}
          onNewDocument={handleReplace}
          onClose={resetAllStates}
        />
      )}
    </div>
  );
}


