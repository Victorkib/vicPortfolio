import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          pdf: ['jspdf', 'jspdf-autotable'],
          ui: ['@mui/material', '@emotion/react', '@emotion/styled'],
        },
      },
    },
  },
});
