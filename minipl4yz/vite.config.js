// vite.config.js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import Inspect from 'vite-plugin-inspect';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    Inspect(),
    laravel({
      input: ['resources/js/app.jsx'],
      refresh: true,
    }),
    react(),
  ],
  resolve:{
    alias:{
      '@': '/resources/js/features',
      '$': '/resources/js/users',
    }
  },
  server: {
    host: 'localhost',
    port: 3000, // O el puerto que prefieras
    proxy:{
      '/api': 'http://localhost:8000',
    }
  },
});
