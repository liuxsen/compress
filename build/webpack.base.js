const devMode = process.env.NODE_ENV === 'development';
console.log('devMode', devMode);
// 提取css
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { getEntry } = require('./utils');
const baseConfig = getEntry();
require('dotenv').config();

console.log(baseConfig);

const staticPlugin = devMode ? new webpack.DefinePlugin({
  '__static': JSON.stringify('/static')
}) : new webpack.DefinePlugin({
  '__static': JSON.stringify('./static')
});

module.exports = {
  target: 'electron-renderer',
  entry: baseConfig.entry,
  output: baseConfig.output,
  resolve: {
    mainFiles: ['index'], // 解析目录时，要使用的文件名
    extensions: ['.jsx', '.js', '.json'], // 解析文件时，使用的文件后缀
  },
  module: {
    rules: [
      {
        test: /\.js|x$/,
        exclude: /node_modules/,
        loader: [
          'babel-loader',
          'astroturf/loader'
        ]
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: [{
          loader: 'file-loader',
          options: {}
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...baseConfig.htmlWebpackPlugins,
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '/css/[name].css' : 'assets/css/[name].[contenthash:8].css',
      chunkFilename: devMode ? 'css/[id].css' : 'assets/css/[id].[contenthash:8].css',
    }),
    staticPlugin
  ]
};