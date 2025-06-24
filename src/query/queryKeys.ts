export const queryKeys = {
  auth: () => ['auth'] as const,
  repositoryHistory: (repositoryId: number | null) => ['repository', 'history', repositoryId] as const,
  repositoryChatHistory: (repositoryId: number | null) => ['repository', 'chat', 'history', repositoryId] as const,
};
