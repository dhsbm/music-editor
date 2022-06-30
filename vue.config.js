const { resolve } = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 别名配置
        common: '@/common', // 公用组件
        components: '@/components', // 组件
        modules: '@/modules', // 模块 js
        scss: '@/scss',
        '@': resolve('src'),
      },
    },
  },
}
