import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'components', replacement: '/src/components' },
      { find: 'routes', replacement: '/src/routes' },
      { find: 'pages', replacement: '/src/pages' },
      { find: 'globals', replacement: '/src/globals' }
    ]
  }
})
