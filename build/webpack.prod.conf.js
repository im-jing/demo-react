const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const basewebpackConfig = require('./webpack.base.conf');

const pathsToClean = ['dist'];
const cleanOptions = {
  root: __dirname, // 打包的根目录
  verbose: true, // 把logs写到console
  dry: false, // true，不remove文件
};

const prodWebpackConfig = merge(basewebpackConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/prod.env'),
    }),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
  ],
});

module.exports = prodWebpackConfig;
