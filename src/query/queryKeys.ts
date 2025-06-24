export const queryKeys = {
  auth: () => ['auth'] as const,
  repositoryHistory: (repositoryId: number | null) => ['repository', 'history', repositoryId] as const,
};
