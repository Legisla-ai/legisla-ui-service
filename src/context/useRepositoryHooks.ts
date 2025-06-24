import { useContext } from 'react';
import { RepositoryContext } from './RepositoryContext';

export function useRepositoryOptional() {
  const context = useContext(RepositoryContext);

  return context ?? null;
}

export function useRepository() {
  const context = useContext(RepositoryContext);

  if (context === undefined) {
    throw new Error('useRepository deve ser usado dentro de um RepositoryProvider');
  }

  return context;
}
