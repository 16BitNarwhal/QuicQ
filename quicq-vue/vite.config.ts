import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        localEnabled: command === 'serve',
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        dts:'./src/auto-import.d.ts'
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  }
})