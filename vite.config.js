import { defineConfig } from "vite";
import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

export default defineConfig(async () => ({
  plugins: [
    vue(),
    Components({
      dirs: ['src/components', 'src/views'],
      extensions: ['vue'],
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
      ],
    }),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router'],
      dirs: ['src/store', 'src/hooks'],
      resolvers: [
        ArcoResolver({
          ignoreIcons: ['icon-'],
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
