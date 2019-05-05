const webpack = require('webpack');
const merge = require('webpack-merge');
const basewebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(basewebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    usedExports: true,
  },
});

module.exports = devWebpackConfig;
