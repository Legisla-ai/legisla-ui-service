import { useState, useMemo, type ReactNode } from 'react';
import { RepositoryContext, RepositoryContextType } from './repository-context';

interface RepositoryProviderProps {
  readonly children: ReactNode;
}

export { RepositoryContext };

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
