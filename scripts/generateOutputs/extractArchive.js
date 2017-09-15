
const fs = require('fs')
const path = require('path')
const unzip = require('unzip-stream')
const extract = require('extract-zip')

const debug = require('./debug')

module.exports = function(platform, archiveFile, outputDir) {
  return new Promise((resolve, reject) => {
    extract(archiveFile, { dir: outputDir }, err => {
      if (err) { reject(err) }
      else { resolve(outputDir) }
    })
  })
}

function extractArchive(platform, archiveFile, outputDir) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(archiveFile)
    const extractStream = unzip.Extract({
      path: outputDir
    })

    debug(platform, 'Extracting archive...')
    readStream
      .on('error', reject)
      .pipe(extractStream)
      .on('close', () => {
        debug(platform, 'Archive extracted.')
        setTimeout(() => {
          resolve(outputDir)
        }, 100)
      })
  })
}
