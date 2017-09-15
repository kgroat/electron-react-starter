
const mainConfig = require('../.config/webpack.config')

const storybookConfig = {
  resolve: mainConfig.resolve,
  module: {
    rules: mainConfig.module.loaders
  }
}

module.exports = storybookConfig
