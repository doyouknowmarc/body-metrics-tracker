import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/body-metrics-tracker/',  // Replace with your repository name
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});