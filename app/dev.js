
const runner = require('./runner')
const package = require('../package.json')
require('./config').setConfig(package)

runner(`http://localhost:${process.env.PORT || 3000}`).subscribe(window => window.webContents.openDevTools())
