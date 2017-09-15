
const clean = require('./clean')
const getArchive = require('./getArchive')
const extractArchive = require('./extractArchive')

module.exports = function archiveHandler(platform, archiveUrl) {
  return Promise.all([
    clean(platform),
    getArchive(platform, archiveUrl),
  ])
  .then(outputs => {
    const archiveFile = outputs[1]
    const outputDir = outputs[0]
    return extractArchive(platform, archiveFile, outputDir)
      .then(() => outputDir)
  })
}