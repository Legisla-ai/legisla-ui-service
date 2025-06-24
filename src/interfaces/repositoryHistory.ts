/**
 * Interfaces para histórico de chat do repositório
 * 
 * **Benefícios da tipagem forte:**
 * - Type safety: previne erros em tempo de compilação
 * - IntelliSense melhorado: autocomplete e documentação inline
 * - Refatoração segura: mudanças são propagadas automaticamente
 * - Documentação viva: interfaces servem como documentação do contrato da API
 */

export interface RepositoryChatHistoryResponse {
  readonly repositoryId: number;
  readonly message: string;
  readonly sender: string;
  readonly interactionType: string;
  readonly createdAt: string; // ISO date string
  readonly updatedAt: string; // ISO date string
}

/**
 * Interface para exibição no componente Sidebar
 * Melhora a separação de responsabilidades entre dados da API e apresentação
 */
export interface DocumentItem {
  readonly id: string; // Gerado a partir de repositoryId + createdAt para uniqueness
  readonly title: string; // Derivado da message
  readonly date: string; // Formatado de createdAt
  readonly starred: boolean; // Campo local para funcionalidade de favoritos
  readonly type: 'chat' | 'pdf' | 'doc' | 'txt'; // Derivado do interactionType
  readonly originalData: RepositoryChatHistoryResponse; // Mantém dados originais para ações
}

/**
 * Enum para tipos de interação padronizados
 * Melhora a manutenibilidade e previne typos
 */
export enum InteractionType {
  DOCUMENT_UPLOAD = 'DOCUMENT_UPLOAD',
  ANALYSIS_REQUEST = 'ANALYSIS_REQUEST',
  ANALYSIS_COMPLETE = 'ANALYSIS_COMPLETE',
  CHAT_MESSAGE = 'CHAT_MESSAGE',
  ERROR = 'ERROR'
}

/**
 * Enum para tipos de remetente
 * Garante consistência na identificação de quem enviou a mensagem
 */
export enum SenderType {
  USER = 'USER',
  AI = 'AI',
  SYSTEM = 'SYSTEM'
}
