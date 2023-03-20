import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  root: "src",
  server: {host: "0.0.0.0", port: 3000},
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1600,
  },
  plugins: [react()],
})
