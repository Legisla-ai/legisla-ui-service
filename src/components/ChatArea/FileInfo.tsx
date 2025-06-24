// src/components/ChatArea/FileInfo.tsx
import React from 'react';

interface FileInfoProps {
  fileName?: string;
  fileSize: string;
}

export const FileInfo: React.FC<FileInfoProps> = ({ fileName, fileSize }) => (
  <div className="flex items-center gap-4 flex-1 min-w-0">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
        <svg 
          className="w-6 h-6 text-gray-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="text-lg font-semibold text-gray-900 truncate">
        {fileName ?? 'Documento carregado'}
      </h3>
      <p className="text-sm text-gray-500">
        {fileSize}
      </p>
    </div>
  </div>
);
