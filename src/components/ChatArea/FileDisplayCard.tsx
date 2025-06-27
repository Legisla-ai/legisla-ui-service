// src/components/ChatArea/FileDisplayCard.tsx
import { Upload } from 'lucide-react';
import { FileInfo } from './FileInfo';
import { getFileSize } from '@/utils/chat';

interface FileDisplayCardProps {
  readonly file: File;
  readonly onReplace: () => void;
  readonly onRemove: () => void;
}

export function FileDisplayCard({ file, onReplace, onRemove }: FileDisplayCardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8 bg-white rounded-lg border border-gray-200 shadow-sm p-6 relative">
      <div className="flex items-center justify-between">
        <FileInfo fileName={file.name} fileSize={getFileSize(file)} />
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={onReplace}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-700 transition-colors duration-200"
            aria-label="Substituir arquivo atual"
          >
            <Upload className="w-4 h-4" />
            Substituir
          </button>
          <button
            onClick={onRemove}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            aria-label="Remover arquivo atual"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}
