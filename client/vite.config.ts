import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/jsearch/query': {
        target: 'http://localhost:3000/api/jsearch/query',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://localhost:3000/api/jsearch/query',
        changeOrigin: true,
        secure: false
      },
    },
  },
});