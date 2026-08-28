import { defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'

export default defineConfig(({mode}) => {
  const envFile =
  mode === 'production'
    ? '../../secret/react-rails/.env.production'
    : '../../secret/react-rails/.env'

  dotenv.config({
    path: path.resolve(__dirname, envFile)
  })

  return {
    base: process.env.VITE_BASE_URL,
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
    }
  }
})
