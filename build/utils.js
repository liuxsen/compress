// isProd 值是字符串
const isProd = process.env.NODE_ENV === 'production';

const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const dirPath = process.cwd()+'/src/pages';
const renderPath = process.cwd() + '/app/render';
// const subDir = fs.readdirSync(dirPath);
const cwdPath = process.cwd();


const getEntry = function () {
  const entry = {};
  const htmlWebpackPlugins = [];
  const historyApiFallbackRewrites  = [];
  // subDir.forEach((dir)=>{
  //   entry[dir] = `${dirPath}/${dir}/index.js`;
  //   htmlWebpackPlugins.push(new HTMLWebpackPlugin({
  //     template: `${dirPath}/${dir}/index.html`,
  //     filename: `${dir}/index.html`,
  //     chunks: ['vendors', 'commons', dir],
  //     favicon: `${dirPath}/${dir}/favicon.ico`
  //   }));
  //   // 开发模式，404 fallback
  //   historyApiFallbackRewrites.push({
  //     from: new RegExp("^\/" + dir,"gim"),
  //     to: `/${dir}/index.html`
  //   });
  // });
  const output = {
    path: cwdPath + '/dist',
    filename: `[name]/[${isProd ? 'chunkhash:9' : 'hash'}].js`,
    publicPath: './' // htmlwebpackplugin生成的路径前缀
  };
  return {
    entry: {
      index: process.cwd() + '/app/render/index.js'
    },
    output: output,
    htmlWebpackPlugins: [
      new HTMLWebpackPlugin({
        template: `${renderPath}/index.html`,
        filename: `index.html`,
        chunks: ['vendors', 'commons', 'index']
      })
    ],
    historyApiFallbackRewrites: [
      { from: /.*/, to: renderPath+'/index.html' }
    ]
  };
};

const appPath = process.cwd() + '/app/render';

exports.getEntry = getEntry;
exports.appPath = appPath;