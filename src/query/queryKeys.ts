export const queryKeys = {
  auth: () => ['auth'] as const,
  //userById: (id: number) => ['user', id] as const, // exemplo pra quando precisar de uma key dinamica com mais de um parametro
  //userByIdAndName: (id: number, name: string) => ['user', id, name] as const, // exemplo pra quando precisar de uma key dinamica com mais de um parametro
};
