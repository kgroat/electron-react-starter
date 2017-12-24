#!/usr/bin/env node

const path = require('path')

const { appName, platforms } = require('../../package.json')

const createApp = require('./createApp')
const platformNames = Object.keys(platforms)

const platformHelpers = platformNames.map(platform => {
  const helper = require(path.join(__dirname, 'platforms', platform))

  return {
    platform: platform,
    archiveUrl: helper.archiveUrl(platforms[platform]),
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
      console.error(`Finished with ${errorMaps.length} errors.`)
      errorMaps.forEach(logError)
      process.exit(errorMaps.length)
    }
  })
}

function logError(errorMap) {
  console.error(`Platform ${errorMap.platform} failed to generate:`, errorMap.error)
}


handlePlatforms(platformHelpers)
