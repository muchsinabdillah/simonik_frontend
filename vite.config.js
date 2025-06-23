import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // port: 3000,
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    hmr: {
      host: '192.168.1.25', // GANTI dengan IP lokal kamu
    }
  },
})
