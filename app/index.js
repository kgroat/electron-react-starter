
const log = require('electron-log')
const path = require('path')

const runner = require('./runner')
const package = require('./package.json')

log.info('got here')
const fileLocation = path.join(__dirname, './bundle.asar')
runner(`file://${fileLocation}`, package.appName).subscribe()
