import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ye change karo agar aap chahtay ho ke output folder ka naam 'dist' ho
  }
})
