
const appConfig = require('./webpack.app')
const distConfig = require('./webpack.dist')

module.exports = [distConfig, appConfig]
