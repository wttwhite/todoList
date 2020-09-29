module.exports = {
  devServer: {
    proxy: {
      '/demo': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        pathRewrite: {
          '/demo': ''
        }
      }
    }
  }
}