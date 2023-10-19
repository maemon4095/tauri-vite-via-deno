import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),],
  clearScreen: false,
  server: {
    port: 5173,
    strictPort: true,
    // disable watcher due to a bug cause crash on tauri build
    watch: null
  },
  envPrefix: ["VITE_", "TAURI_"],
});
