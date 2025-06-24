// src/components/ChatArea/ChatHeader.tsx
import { Upload } from 'lucide-react';
import { truncateFileName } from './utils';

interface ChatHeaderProps {
  readonly fileName?: string;
  readonly fileSize?: string;
  readonly analysisCount: number;
  readonly messageCount: number;
  readonly onNewDocument: () => void;
  readonly onClose: () => void;
}

export function ChatHeader({ 
  fileName, 
  fileSize, 
  analysisCount, 
  messageCount, 
  onNewDocument, 
  onClose 
}: ChatHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-4 shadow-sm flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-700 to-cyan-400 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {truncateFileName(fileName ?? 'documento', 50)}
            </h3>
            <p className="text-sm text-gray-500">
              {analysisCount} análise{analysisCount !== 1 ? 's' : ''} realizada{analysisCount !== 1 ? 's' : ''} • {messageCount} mensagens
              {fileSize && ` • ${fileSize}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onNewDocument}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-700 transition-colors"
            title="Substituir documento"
          >
            <Upload className="w-4 h-4" />
            Novo Documento
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-md hover:bg-gray-100"
            title="Fechar chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
