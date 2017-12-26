
const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const package = require('../package.json')

const distDir = path.join(__dirname, '../intermediates/dist')
const srcDir = path.join(__dirname, '../src')

const mainConfig = require('./webpack.main')

const PORT = process.env.PORT || 3000

const distConfig = {
  ...mainConfig,
  entry: {
    'index': [
      'react-hot-loader/patch',
      path.join(srcDir, 'index.tsx'),
      'webpack/hot/only-dev-server',
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "../static"),
    port: PORT,
    hot: true,
  },
  output: {
    filename: '[name].js',
    path: distDir
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: package.appName,
      chunks: ['index'],
      template: path.join(__dirname, '../src/index.ejs')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = distConfig
