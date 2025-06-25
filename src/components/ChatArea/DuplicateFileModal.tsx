// src/components/ChatArea/DuplicateFileModal.tsx
import { useEffect } from 'react';

interface DuplicateFileModalProps {
  readonly isOpen: boolean;
  readonly suggestion: string;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
  readonly isLoading?: boolean;
}

/**
 * Modal user-friendly para confirmar upload de arquivo duplicado
 * 
 * **Melhorias User-Friendly Implementadas:**
 * - Título informativo: "Arquivo Similar Encontrado" 
 * - Ícone amigável: Documento com checkmark ao invés de warning
 * - Linguagem clara: Texto direto explicando a situação
 * - Botões específicos: "Enviar Mesmo Assim" e "Cancelar"
 * - Visual convidativo: Azul suave para informação, sem tons alarmantes
 * - Suporte completo a teclado: ESC/Enter + foco automático
 * - Prevenção de scroll e click-outside para fechar
 * 
 * **Benefícios UX:**
 * - Linguagem menos técnica, mais conversacional
 * - Não trata como erro, mas como informação útil
 * - Visual amigável que não assusta o usuário
 * - Ações claras sobre o que vai acontecer
 * - Experiência fluida e não intrusiva
 */
export function DuplicateFileModal({
  isOpen,
  suggestion,
  onConfirm,
  onCancel,
  isLoading = false,
}: DuplicateFileModalProps) {
  // **Melhor acessibilidade**: Auto-foco no botão principal quando modal abre
  useEffect(() => {
    if (isOpen && !isLoading) {
      // Foca no botão de confirmar após um pequeno delay para permitir animação
      const timer = setTimeout(() => {
        const confirmButton = document.querySelector('[data-modal-confirm]') as HTMLButtonElement;
        confirmButton?.focus();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, isLoading]);

  // **Suporte a eventos de teclado**: ESC cancela globalmente
  // **Benefício**: Melhor acessibilidade e experiência para usuários avançados
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen || isLoading) return;
      
      if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // **Previne scroll da página**: Melhora foco na modal
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {/* **Modal acessível**: Usar dialog nativo para melhor acessibilidade */}
      <dialog 
        open
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 p-6 border border-gray-200 animate-in slide-in-from-bottom-4 duration-300 m-0"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {/* **Header mais amigável**: Ícone de documento com visual convidativo */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900" id="modal-title">
              Arquivo Similar Encontrado
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Detectamos um arquivo parecido no seu histórico
            </p>
          </div>
        </div>

        {/* **Content mais claro**: Explicação direta e amigável */}
        <div className="mb-6" id="modal-description">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-gray-800 text-sm leading-relaxed">{suggestion}</p>
          </div>

          <p className="text-gray-600 text-sm">
            Você pode continuar e enviar este arquivo mesmo assim. Não se preocupe - você terá acesso aos dois arquivos.
          </p>
        </div>

        {/* **Actions mais claras**: Botões com linguagem específica */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Cancelar
          </button>
          <button
            data-modal-confirm
            onClick={onConfirm}
            disabled={isLoading}
            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Enviando...
              </span>
            ) : (
              'Enviar Mesmo Assim'
            )}
          </button>
        </div>
      </dialog>
    </div>
  );
}
