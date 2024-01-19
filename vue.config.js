const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  configureWebpack: {
    resolve: {
      fallback: {
        querystring: require.resolve('querystring-es3')
      }
    }
  },
  transpileDependencies: true,
  devServer: {
    proxy: ''//'https://treninkovy-denik-api.azurewebsites.net/',
    }
})
