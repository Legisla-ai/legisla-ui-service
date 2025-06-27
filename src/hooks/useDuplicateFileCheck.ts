// src/hooks/useDuplicateFileCheck.ts
import { useState } from 'react';
import { RepositoryHistoryService } from '@/services/repositoryHistoryService';
import type { RepositoryResponse } from '@/interfaces/repositoryHistory';

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  existingRepository?: RepositoryResponse;
  suggestion?: string;
}

export interface DuplicateCheckState {
  isChecking: boolean;
  duplicateResult: DuplicateCheckResult | null;
  error: string | null;
}

export function useDuplicateFileCheck() {
  const [state, setState] = useState<DuplicateCheckState>({
    isChecking: false,
    duplicateResult: null,
    error: null,
  });

  const checkDuplicate = async (file: File): Promise<DuplicateCheckResult> => {
    setState((prev) => ({ ...prev, isChecking: true, error: null }));

    try {
      const result = await RepositoryHistoryService.checkForDuplicateFile(file);

      setState((prev) => ({
        ...prev,
        isChecking: false,
        duplicateResult: result,
      }));

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao verificar duplicatas';

      setState((prev) => ({
        ...prev,
        isChecking: false,
        error: errorMessage,
        duplicateResult: { isDuplicate: false },
      }));

      return { isDuplicate: false };
    }
  };

  const resetCheck = () => {
    setState({
      isChecking: false,
      duplicateResult: null,
      error: null,
    });
  };

  const confirmDuplicateUpload = () => {
    setState((prev) => ({
      ...prev,
      duplicateResult: { isDuplicate: false },
    }));
  };

  return {
    ...state,

    // Ações
    checkDuplicate,
    resetCheck,
    confirmDuplicateUpload,

    hasDuplicate: state.duplicateResult?.isDuplicate === true,
    canProceed: state.duplicateResult?.isDuplicate === false,
    isReady: !state.isChecking && state.duplicateResult !== null,
  };
}
