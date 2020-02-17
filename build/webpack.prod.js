process.env.NODE_ENV = 'production';

const { appPath } = require('./utils');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.base');
// 压缩css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// tree shaking 压缩js
const TerserPlugin = require('terser-webpack-plugin');
// 生成html模板
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const prodConfig = merge(baseConfig, {
  mode: 'none',
  // devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    // 生产模式，copy静态文件
    new CopyWebpackPlugin([
      {
        from: appPath+'/static',
        to: 'static'
      }
    ])
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // 压缩js
      new TerserPlugin(),
      // 压缩css
      new OptimizeCSSAssetsPlugin({})
    ],
    // tree shaking,标记未使用的模块，如果mode为production 就会删除标记的未使用的模块
    usedExports: true,
    // 代码分割
    splitChunks: {
      minSize: 0, // 最小代码
      cacheGroups: {
        // 提取共用框架的js代码
        vendors: {
          filename: 'assets/js/[name].js',
          test: /(react|react-dom)/,
          name: 'vendors',
          chunks: 'all'
        },
        // 提取公共的js代码
        commons: {
          filename: 'assets/js/[name]_[chunkhash:8].js',
          name: 'commons', // 
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  },
});

module.exports = prodConfig;