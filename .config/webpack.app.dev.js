const path = require('path')

const appDir = path.join(__dirname, '../app')
const outputDir = path.join(__dirname, '../intermediates/app')

const mainConfig = require('./webpack.main')

const appConfig = {
  ...mainConfig,
  entry: {
    'index': path.join(appDir, 'dev.ts')
  },
  output: {
    filename: '[name].js',
    path: outputDir
  },
}

module.exports = appConfig
