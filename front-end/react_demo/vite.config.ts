import { defineConfig } from 'vite';
import { resolve } from "path";
import react from '@vitejs/plugin-react';
import { viteMockServe } from 'vite-plugin-mock';

// 判断环境
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      "@Img": resolve(__dirname, "./src/assets/Images"),
      '~': resolve(__dirname, './'), // 根路径
      '@': resolve(__dirname, 'src') // src 路径
    }
  },
  plugins: [
    react(),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: isDev, // 是否在开发环境中启用
      prodEnabled: !isDev, // 是否在生产环境中启用
      supportTs: true, // 是否支持TS
      watchFiles: true, // 监听文件
      // 添加处理生产环境文件
      injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
      `,
      // 添加到`src/main.jsx`文件中
      injectFile: resolve(process.cwd(), 'src/main.jsx')
    })
  ],
  server: {
    port: 3001,
    host: '0.0.0.0',
    open: true
  },
  css: {
    // 预处理器配置项
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  }
})
