import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Raise chunk warning threshold to reflect current bundle size
    chunkSizeWarningLimit: 650,
  },
})
