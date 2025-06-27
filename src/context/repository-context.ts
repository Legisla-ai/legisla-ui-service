import { createContext } from 'react';

export interface RepositoryContextType {
  currentRepositoryId: number | null;
  setCurrentRepositoryId: (id: number | null) => void;
  repositoryName?: string;
  setRepositoryName: (name: string) => void;
  selectedRepositoryId: number | null;
  setSelectedRepositoryId: (id: number | null) => void;
}

export const RepositoryContext = createContext<RepositoryContextType | undefined>(undefined);
