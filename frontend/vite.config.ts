import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dotenv from 'dotenv'

dotenv.config()
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    hmr: {
      host: 'localhost'
    },
    watch: {
      usePolling: true
    }
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
