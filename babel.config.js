const presets = [
  // [
  //   "@babel/preset-env",
  //   {
  //     "useBuiltIns": "usage",
  //     corejs: '3.0.0',
  //   }
  // ],
  '@babel/preset-react'
];
const plugins = [
  'lodash', // 按需提取lodash
  'transform-class-properties',
  [
    "babel-plugin-styled-components",
  ]
];

module.exports = {
  presets,
  plugins
};
