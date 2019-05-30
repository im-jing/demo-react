const fs = require('fs');
const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const isProduction = process.env.NODE_ENV === 'production';
const publicConf = require('../config/public.conf');

const srcPath = './src';
const templatePath = `${srcPath}/template/`; // 模板路径
const entriesPath = `${srcPath}/entry/`; // 入口js路径

// ====================================================================
// find all entries, and config one template for every entry
// ====================================================================
let entryJs = [];
const entries = {};
const pages = [];
const reVendorReact = /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|prop-types)[\\/]/;
const reVendorCore = /[\\/]node_modules[\\/](core-js|moment)[\\/]/;
const reVendorOther = module => /[\\/]node_modules[\\/]/.test(module.resource)
    && !reVendorReact.test(module.resource)
    && !reVendorCore.test(module.resource);

// 获取entry目录下文件完整路径
entryJs = glob.sync(`${entriesPath}**/*.js?(x)`);

entryJs.forEach((fileName) => {
  const entryName = fileName.replace(entriesPath, '').replace(/\.jsx?$/, '');

  entries[entryName] = fileName;

  let tplName = `${templatePath + entryName}.html`;

  try {
    fs.accessSync(tplName, fs.F_OK);
  } catch (err) {
    tplName = `${templatePath}default.ejs`;
  }

  // 多entry打包生成对应名字html
  pages.push(new HtmlWebpackPlugin({
    publicPath: publicConf.publicPath,
    filename: `./${entryName}.html`, // 生成的html存放路径,这里的根路径是module.exports.output.path
    template: tplName, // html模板路径
    inject: true, // js插入的位置，true/'head'/'body'/false
    hash: true, // 为静态资源生成hash值
    // chunks: ['common', entryName], // 需要引入的chunk，不配置就会引入所有页面的资源
    // chunksSortMode: 'manual',
    minify: {
      removeComments: true, // 移除HTML中的注释
      // collapseWhitespace: true, // 删除空白符与换行符
    },
  }));
});

// 添加公共js, common.js
entries.thunks = `${srcPath}/common.js`;

const configExports = {
  devServer: {
    publicPath: publicConf.publicPath,
    contentBase: publicConf.distPath, // 告诉服务器从哪里提供内容
    host: '0.0.0.0',
    port: 7000,
    hot: true,
    historyApiFallback: true,
  },

  entry: entries,

  output: {
    path: publicConf.distPath,
    publicPath: publicConf.publicPath,
    filename: 'js/[name].[hash].js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css'], // 自动解析确定的扩展,能够使用户在引入模块时不带扩展名
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },

  externals: {},

  module: {
    rules: [
      {
        test: /.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      }, {
        test: /\.(js|jsx)$/,
        // 把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
        loader: 'happypack/loader?id=happyBabel',
        // loader: 'babel-loader',
        // 排除node_modules 目录下的文件
        exclude: /node_modules/,
      }, {
        test: /\.(eot|ttf|otf|woff)$/,
        use: [{
          loader: 'url-loader',
          options: {
            path: '',
            name: 'font/[path][name].[hash].[ext]',
            context: srcPath,
            // publicPath: '/',
          },
        }],
      }, {
        test: /\.(jpe?g|png|gif|svg|swf|mp4)$/,
        use: [{
          loader: 'url-loader',
          options: {
            // publicPath: 'http://aaa/',
            limit: 1000,
            path: '',
            name: 'media/[path][name].[hash].[ext]',
            context: srcPath,
          },
        }],
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 100000,
      maxSize: 900000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      automaticNameDelimiter: '-',
      name: false,
      cacheGroups: {
        vendors: {
          test: reVendorOther,
          priority: -10,
          name: 'vendor',
        },
        react: {
          test: reVendorReact,
          priority: 0,
          name: 'vendor-react',
        },
        core: {
          test: reVendorCore,
          priority: 0,
          name: 'vendor-core',
        },
      },
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[hash].css' : '[name].css',
    }),
    new ProgressBarPlugin(),
    new HappyPack({
      // 用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      // 如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true',
      }],
      // 共享进程池
      threadPool: happyThreadPool,
      // 允许 HappyPack 输出日志
      verbose: true,
    }),
  ].concat(pages),
};

module.exports = configExports;
