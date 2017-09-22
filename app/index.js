
const log = require('electron-log')
const path = require('path')

const runner = require('./runner')
const package = require('../package.json')
require('./config').setConfig(package)

log.info('got here')
const fileLocation = path.join(__dirname, './bundle.asar')
runner(`file://${fileLocation}`).subscribe()
