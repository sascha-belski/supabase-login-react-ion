import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/supabase-login-react-ion/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split large frameworks into separate chunks
          ionic: ['@ionic/react', '@ionic/react-router'],
          react: ['react', 'react-dom'],
          ionicons: ['ionicons']
        }
      }
    }
  }
})
