import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'zustand'], // optional optimization
        },
      },
    },
  },
  base: '/', // Keep '/' if app is served from the domain root
})
