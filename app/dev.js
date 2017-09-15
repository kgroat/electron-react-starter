
const runner = require('./runner')
const package = require('../package.json')

runner(`http://localhost:${process.env.PORT || 3000}`, package.appName).subscribe(window => window.webContents.openDevTools())
