import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // ex base: '/my_project/',
  base: '/<use_cornerstonejs>/',
  plugins: [react()],
});