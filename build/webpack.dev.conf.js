// const webpack = require('webpack');
const merge = require('webpack-merge');
const basewebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(basewebpackConfig, {
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': require('../config/dev.env'),
    // }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
});

module.exports = devWebpackConfig;
