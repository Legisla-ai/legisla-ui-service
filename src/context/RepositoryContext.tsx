import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';

interface RepositoryContextType {
  currentRepositoryId: number | null;
  setCurrentRepositoryId: (id: number | null) => void;
  repositoryName?: string;
  setRepositoryName: (name: string) => void;
  selectedRepositoryId: number | null;
  setSelectedRepositoryId: (id: number | null) => void;
}

export const RepositoryContext = createContext<RepositoryContextType | undefined>(undefined);

interface RepositoryProviderProps {
  readonly children: ReactNode;
}

export function RepositoryProvider({ children }: RepositoryProviderProps) {
  const [currentRepositoryId, setCurrentRepositoryId] = useState<number | null>(null);
  const [repositoryName, setRepositoryName] = useState<string>('');
  const [selectedRepositoryId, setSelectedRepositoryId] = useState<number | null>(null);

  const value: RepositoryContextType = useMemo(
    () => ({
      currentRepositoryId,
      setCurrentRepositoryId,
      repositoryName,
      setRepositoryName,
      selectedRepositoryId,
      setSelectedRepositoryId,
    }),
    [currentRepositoryId, repositoryName, selectedRepositoryId]
  );

  return <RepositoryContext.Provider value={value}>{children}</RepositoryContext.Provider>;
}

export function useRepository() {
  const context = useContext(RepositoryContext);

  if (context === undefined) {
    throw new Error('useRepository deve ser usado dentro de um RepositoryProvider');
  }

  return context;
}
