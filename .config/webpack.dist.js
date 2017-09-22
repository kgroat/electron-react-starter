const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const package = require('../package.json')

const distDir = path.join(__dirname, '../intermediates/dist')
const srcDir = path.join(__dirname, '../src')

const mainConfig = require('./webpack.main')

const distConfig = {
  ...mainConfig,
  entry: {
    'index': path.join(srcDir, 'index.tsx'),
    //'about/index': path.join(srcDir, 'about.tsx')
  },
  devServer: {
    contentBase: path.join(__dirname, "static"),
    compress: true,
    port: process.env.PORT || 3000
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
    new HtmlWebpackPlugin({
      title: 'About',
      chunks: ['about/index'],
      template: path.join(__dirname, '../src/index.ejs'),
      filename: 'about/index.html'
    }),
    //new CopyWebpackPlugin([
    //  {
    //    from: path.join(__dirname, '../static')
    //  }
    //])
  ]
}

module.exports = distConfig
