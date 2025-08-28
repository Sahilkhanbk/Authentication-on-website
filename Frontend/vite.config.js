import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import VitePluginRewriteAll from 'vite-plugin-rewrite-all'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePluginRewriteAll()],
})
