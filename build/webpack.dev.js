
const {appPath, getEntry} = require('./utils');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    publicPath: '/', // 打包的文件放在的目录
    disableHostCheck: false,
    port: 4001,
    contentBase: appPath,
    historyApiFallback: {
      rewrites: getEntry().historyApiFallbackRewrites
    },
    proxy: {
      '/api': {
        target: 'http://39.99.181.135:3000',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      },
    }
  },
  plugins: [
  ]
});

module.exports = devConfig;