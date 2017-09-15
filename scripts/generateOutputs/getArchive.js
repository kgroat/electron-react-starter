
const fs = require('fs')
const path = require('path')
const request = require('request')

const debug = require('./debug')

const archiveDir = path.join(__dirname, '../../intermediates/archives')

module.exports = function getArchive(platform, archiveUrl) {
  const archiveFile = path.join(archiveDir, `${platform}.zip`)

  return new Promise((resolve, reject) => {
    if (fs.existsSync(archiveFile)) {
      debug(platform, 'Archive found.')
      return resolve(archiveFile)
    }

    debug(platform, 'Archive not found; downloading...')
    const fileStream = fs.createWriteStream(archiveFile)
    const urlStream = request(archiveUrl, err => {
      if (err) { reject(err) }
    })

    urlStream
      .on('error', reject)
      .pipe(fileStream)
      .on('error', reject)
      .on('close', () => {
        debug(platform, 'Archive downloaded.')
        resolve(archiveFile)
      })
  })
}
