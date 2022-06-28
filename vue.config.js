const { resolve } = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 别名配置
        components: '@/components',
        modules: '@/modules',
        scss: '@/scss',
        '@': resolve('src'),
      },
    },
  },
}
