
const path = require('path')
const fs = require('fs')

const createDir = require('../createDir')
const copyFile = require('../copyFile')

const archiveUrl = (version) => `https://github.com/electron/electron/releases/download/v${version}/electron-v${version}-linux-ia32.zip`

module.exports = {
  archiveUrl: archiveUrl,
  prepareApp: prepareApp,
}

function prepareApp (outputDir, appName) {
  const resourcesDir = path.join(outputDir, 'resources')
  const destDir = path.join(resourcesDir, 'app')
  
  return Promise.all([
    createDir(destDir),
    copyPngIcons(destDir)
  ])
  .then(() => destDir)
}

function wait (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

function renameApp(outputDir, appName) {
  return rename(outputDir, {
    source: 'electron',
    dest: `${appName}`
  })
}

function rename(outputDir, item) {
  const source = path.join(outputDir, item.source)
  const dest = path.join(outputDir, item.dest)

  return new Promise((resolve, reject) => {
    fs.rename(source, dest, (err) => {
      if (err) { reject(err) }
      else { resolve(dest) }
    })
  })
}

function copyPngIcons(destDir) {
  return copyFile(
    path.join(__dirname, '../../../intermediates/icons/png'),
    path.join(destDir, 'icons')
  )
}
