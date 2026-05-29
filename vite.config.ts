import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/~i2504156/portfolio/', // TODO : Check to make sure it's the good root folder
  plugins: [react()],
})
