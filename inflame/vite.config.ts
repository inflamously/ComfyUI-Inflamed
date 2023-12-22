import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@inflame/models": path.resolve(__dirname, "./src/+models"),
      "@inflame/state": path.resolve(__dirname, "./src/+state")
    }
  }
})
