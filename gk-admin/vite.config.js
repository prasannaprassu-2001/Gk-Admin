import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react()  // ✅ handles JSX & TSX
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@src': path.resolve(__dirname, 'src'),
    },
  },
 server: {
  proxy: {
    '/auth': {
      target: 'https://godavarikrishna-sales.onrender.com',
      changeOrigin: true,
      secure: false,
    },
    '/admin': {
      target: 'https://godavarikrishna-sales.onrender.com',
      changeOrigin: true,
      secure: false,
    },
  },
}
})