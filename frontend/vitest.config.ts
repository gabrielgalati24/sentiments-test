import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //load  @ webpack  alias
  resolve: {
   
  },
  test: {
    environment: 'happy-dom',
    exclude: ['./tests/e2e/*','**/node_modules/**'],

  },
})
