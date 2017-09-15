
const mainConfig = require('../.config/webpack.config')

const storybookConfig = {
  resolve: mainConfig.resolve,
  module: mainConfig.module
}

module.exports = storybookConfig

module.exports = (storybookBaseConfig, configType) => {

  storybookBaseConfig.module.rules = mainConfig.module.rules
  storybookBaseConfig.resolve.extensions = mainConfig.resolve.extensions

  return storybookBaseConfig
};