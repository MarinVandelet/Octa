import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Local dev: /
  // Production build (VPS): /octa/
  base: mode === 'production' ? '/octa/' : '/',
  plugins: [react()],
}))
