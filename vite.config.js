import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      name: 'dev-template-html',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url === '/' || req.url === '/index.html') {
            req.url = '/index.template.html';
          }

          next();
        });
      }
    }
  ],
  build: {
    rollupOptions: {
      input: resolve(rootDir, 'index.template.html'),
      output: {
        entryFileNames: 'assets/index-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
});
