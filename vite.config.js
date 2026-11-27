import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Absolute base: the site runs on the root of harshit.buzz with client-side routes
  // (/trippy, /ventures/:id, ...), so assets must resolve from '/' at any depth.
  base: '/',
  server: {
    port: 3000
  },
  build: {
    chunkSizeWarningLimit: 800
  }
});
