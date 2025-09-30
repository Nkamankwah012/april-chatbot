import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/widget.tsx'),
      name: 'AirCareWidget',
      fileName: 'widget',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        // Ensure all dependencies are bundled
        inlineDynamicImports: true,
      }
    },
    // Don't minify for easier debugging during development
    minify: 'terser',
    sourcemap: false
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
})