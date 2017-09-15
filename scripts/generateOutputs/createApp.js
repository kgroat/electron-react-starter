
const appName = require('../../package.json').appName

const debug = require('./debug')
const archiveHandler = require('./archiveHandler')
const copyAppContent = require('./copyAppContent')

module.exports = function createApp(outputHelper) {
  const platform = outputHelper.platform
  const archiveUrl = outputHelper.archiveUrl
  const prepareApp = outputHelper.prepareApp

  return archiveHandler(platform, archiveUrl)
    .then(outputDir => {
      debug(platform, 'Preparing app...')
      return prepareApp(outputDir, appName)
        .then(appDir => {
          debug(platform, 'Done preparing app.')
          return appDir
        })
    })
    .then(contentDir => copyAppContent(platform, contentDir))
}
