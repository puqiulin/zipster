import {defineConfig} from 'vite'
import path from "path";
import react from '@vitejs/plugin-react-swc'

const __dirname = path.resolve();
export default defineConfig({
    root: "src",
    server: {host: "0.0.0.0", port: 3000},
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        chunkSizeWarningLimit: 1600,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, "./src"),
            '@root': path.resolve(__dirname, "."),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    plugins: [react()],
})
