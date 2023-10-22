import { PluginOption, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), patchWatcher()],
  clearScreen: false,
  server: {
    port: 5173,
    strictPort: true,
    // disable watcher due to a bug cause crash on tauri build
    watch: {}
  },
  envPrefix: ["VITE_", "TAURI_"],
});

/** Due to fs watcher issue, if watching paths contains a path that is ancestor of "src-tauri", deno throws an exception on tauri build.
 *  To avoid this issue, we must remove paths that is ancestor of "src-tauri".
 */
function patchWatcher(): PluginOption {
  return {
    name: "patchWatcher",
    configureServer(server) {
      const watcher = server.watcher;
      const originalAdd = watcher.add.bind(watcher);

      const add = (arg: string | string[]) => {
        const paths: string[] = Array.isArray(arg) ? arg : [arg];

        const filtered = paths.filter(path => path !== ".");

        originalAdd(filtered);

        return watcher;
      };
      watcher.add = add.bind(watcher);
    }

  };
}