import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Laikinai pašaliname arba užkomentuojame šį bloką
  // esbuild: {
  //   loader: {
  //     '.js': 'jsx',
  //   },
  // },
})