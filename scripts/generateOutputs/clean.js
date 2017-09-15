
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

const outputRoot = path.join(__dirname, '../../output/')

module.exports = function clean(platform) {
  const outputDir = path.join(outputRoot, platform)
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(outputDir)) {
      return resolve(outputDir)
    }

    rimraf(outputDir, err => {
      if (err) { reject(err) }
      else { resolve(outputDir) }
    })
  })
}