
const webpack = require('webpack')
const path = require('path')

const appDir = path.join(__dirname, '../app')
const outputDir = path.join(__dirname, '../intermediates/app')

const mainConfig = require('./webpack.main')

const appConfig = {
  ...mainConfig,
  entry: {
    'index': path.join(appDir, 'dev.ts')
  },
  target: 'node',
  output: {
    filename: '[name].js',
    path: outputDir
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': JSON.stringify(true)
    }),
  ],
}

module.exports = appConfig
