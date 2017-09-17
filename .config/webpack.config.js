const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const package = require('../package.json')

module.exports = {
  entry: [
    path.join(__dirname, '../src/index.tsx')
  ],
  devServer: {
    contentBase: path.join(__dirname, "static"),
    compress: true,
    port: process.env.PORT || 3000
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '../intermediates/dist')
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.html'],
    alias: {
      src: path.join(__dirname, '../src'),
      components: path.join(__dirname, '../src/components'),
      containers: path.join(__dirname, '../src/containers'),
      actions: path.join(__dirname, '../src/redux/actions'),
      state: path.join(__dirname, '../src/redux/state'),
    }
  },
  module: {
    loaders: [
      {
        test: /^\.html$/,
        loaders: [
          'extract-loader',
          'html-loader?attrs=srcipt:src'
        ]
      },
      {
        test: /\.tsx?$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: path.join(__dirname, './tsconfig.json')
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.s?css$/,
        loaders: [
          {
            loader: 'style-loader',
            options: {
              singleton: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 2
            }
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ],
        exclude: /(node_modules|globalStyles)/,
      },
      {
        test: /\.s?css$/,
        loaders: [
          'style-loader?singleton=true',
          'css-loader?sourceMap&importLoaders=1',
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ],
        exclude: /(components|containers)/,
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|ico)$/,
        loader: 'file-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: package.appName,
      template: path.join(__dirname, '../src/index.ejs')
    }),
    //new CopyWebpackPlugin([
    //  {
    //    from: path.join(__dirname, '../static')
    //  }
    //])
  ]
}