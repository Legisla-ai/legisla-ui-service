// src/components/ChatArea/hooks/useAnalysisHandler.ts
import { getActionTitle } from '../utils';

/**
 * Hook para gerenciar operações de análise de documentos
 * 
 * **Melhorias:**
 * - Separação de responsabilidade: apenas lógica de análise
 * - Reutilizável: pode ser usado em diferentes contextos
 * - Testabilidade: lógica de análise isolada e testável
 * - Error handling: tratamento centralizado de erros
 */
export function useAnalysisHandler() {
  // Mock function to simulate backend response (remove this when going to production)
  const mockAnalyzeDocument = async (promptKey: string): Promise<string> => {
    // Simulate ~12 seconds backend processing time
    await new Promise(resolve => setTimeout(resolve, 120000));
    
    const mockResponses = {
      'complete_analysis': `## Análise Completa do Documento

**Resumo Executivo:**
Este documento apresenta aspectos jurídicos relevantes que foram analisados detalhadamente. A análise identificou pontos de atenção importantes para consideração.

**Principais Conclusões:**
• O documento está estruturado de forma adequada
• Existem cláusulas que merecem atenção especial
• Recomenda-se revisão de alguns termos específicos

**Recomendações:**
1. Revisar as cláusulas contratuais mencionadas
2. Verificar conformidade com a legislação atual
3. Considerar ajustes nos termos identificados

*Esta é uma análise mockada para fins de demonstração.*`,

      'risk_analysis': `## Análise de Riscos Jurídicos

**Nível de Risco: MÉDIO**

**Riscos Identificados:**
🔴 **Alto Risco:**
• Cláusulas com redação ambígua que podem gerar interpretações conflitantes

🟡 **Médio Risco:**
• Termos que podem não estar alinhados com regulamentação recente
• Ausência de algumas proteções contratuais recomendadas

🟢 **Baixo Risco:**
• Estrutura geral do documento adequada
• Aspectos formais em conformidade

**Mitigação Sugerida:**
- Esclarecer redação das cláusulas ambíguas
- Atualizar termos conforme legislação vigente
- Incluir cláusulas de proteção adicionais

*Esta é uma análise mockada para fins de demonstração.*`,

      'jurisprudence_search': `## Busca Jurisprudencial

**Precedentes Encontrados:**

**STJ - Superior Tribunal de Justiça**
• REsp nº 1.234.567/SP - Caso similar com interpretação favorável
• AgInt no AREsp nº 987.654/RJ - Precedente relevante sobre o tema

**TJSP - Tribunal de Justiça de São Paulo**
• Apelação nº 1234567-89.2020.8.26.0100 - Jurisprudência consolidada
• AI nº 9876543-21.2021.8.26.0000 - Entendimento recente

**Súmulas Aplicáveis:**
• Súmula 123 do STJ: "Entendimento consolidado sobre a matéria..."
• Súmula 456 do STF: "Interpretação constitucional relevante..."

**Análise dos Precedentes:**
A jurisprudência demonstra tendência favorável à interpretação que beneficia a parte contratante, especialmente nos casos mais recentes.

*Esta é uma análise mockada para fins de demonstração.*`
    };

    return mockResponses[promptKey as keyof typeof mockResponses] || 
           `Análise realizada com sucesso para: ${promptKey}\n\nEsta é uma resposta mockada do sistema de análise jurídica. O documento foi processado e analisado conforme solicitado.\n\n*Esta é uma análise mockada para fins de demonstração.*`;
  };

  // Analysis request handler with loading steps and mock response
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

    // Simulate progressive steps during analysis with slower timing for better visual feedback
    setTimeout(() => setLoadingStep(2), 3000);
    setTimeout(() => setLoadingStep(3), 5500);

    try {
      // MOCK: Using mock function instead of real API to avoid costs during development
      // To restore real API: uncomment import, uncomment lines below, remove mockAnalyzeDocument
      // const response = await analyzeDocument({
      //   file: currentFile,
      //   promptType: promptKey,
      // });
      // const formattedResponse = formatAnalysisResponse(response);
      
      const mockResponse = await mockAnalyzeDocument(promptKey);
      addMessage(mockResponse, false);
      
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
      setLoadingStep(1); // Reset for next analysis
    }
  };

  return {
    handleAnalysisRequest,
    mockAnalyzeDocument, // Export for potential reuse
  };
}
