import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  esbuild: {
    drop: ['console', 'debugger'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk para bibliotecas grandes
          vendor: ['react', 'react-dom'],
          // Ant Design chunk
          antd: ['antd', '@ant-design/x', '@ant-design/icons'],
          // React Query chunk
          query: ['@tanstack/react-query'],
          // Lucide icons chunk
          icons: ['lucide-react'],
          // Routing chunk
          router: ['react-router-dom'],
        },
      },
    },
    // Aumentar o limite de aviso para chunks
    chunkSizeWarningLimit: 1000,
    // Otimizações adicionais
    minify: 'esbuild',
    target: 'esnext',
    sourcemap: false,
  },
  // Otimizações de desenvolvimento
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'antd',
      '@ant-design/x',
      '@ant-design/icons',
      '@tanstack/react-query',
      'lucide-react',
      'react-router-dom',
    ],
  },
});
