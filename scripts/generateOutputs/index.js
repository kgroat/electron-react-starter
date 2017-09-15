
const path = require('path')

const appName = require('../../package.json').appName

const getDependencies = require('./getDependencies')
const createApp = require('./createApp')

const platforms = [
  'darwin',
  'win32',
  'win64',
]

const platformHelpers = platforms.map(platform => {
  const helper = require(path.join(__dirname, 'platforms', platform))

  return {
    platform: platform,
    archiveUrl: helper.archiveUrl,
    prepareApp: helper.prepareApp,
  }
})

const errorMaps = []

function handlePlatforms (outputHelpers) {
  console.log('Building final outputs...')
  return Promise.all(outputHelpers.map(helper => {
    return createApp(helper)
      .catch(err => {
        const errorMap = {
          platform: helper.platform,
          error: err
        }
        errorMaps.push(errorMap)
        logError(errorMap)
      })
  })).then(() => {
    console.log('Done!')
    if (errorMaps.length > 0) {
      console.error(`Finished with ${errorMaps.count} errors.`)
      errorMaps.forEach(logError)
      process.exit(errorMaps.count)
    }
  })
}

function logError(errorMap) {
  console.error(`Platform ${errorMap.platform} failed to generate:`, errorMap.error)
}


getDependencies()
  .then(() => handlePlatforms(platformHelpers))
