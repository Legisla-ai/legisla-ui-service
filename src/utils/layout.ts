// src/utils/layout.ts
export const HIDDEN_FLOAT_BUTTON_PAGES = ['/chat', '/repositorio', '/analise-completa', '/analise-riscos'];

export const shouldHideFloatButton = (pathname: string): boolean => {
  return HIDDEN_FLOAT_BUTTON_PAGES.includes(pathname);
};
