
const runner = require('./runner')
const package = require('./package.json')

runner('./dist', package.appName).subscribe()
