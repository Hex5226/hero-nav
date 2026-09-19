import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite 配置：Vercel 会自动识别 Vite 项目并按其默认构建流程部署
export default defineConfig({
  plugins: [react()],
})
