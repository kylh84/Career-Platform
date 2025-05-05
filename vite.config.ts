import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    open: true,
    // Cấu hình dev server cho SPA
    proxy: undefined,
    cors: true,
    middlewareMode: false,
  },
  // Cấu hình để tránh các vấn đề về CORS và cache
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  build: {
    sourcemap: true,
    // Đảm bảo Vite tạo ra một fallback index.html cho SPA với BrowserRouter
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  preview: {
    // Cấu hình cho chế độ preview
    port: 5173,
  },
});
