import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    historyApiFallback: true, // Ensures React Router works in development
  },
})
