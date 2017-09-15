
const path = require('path')
const fs = require('fs')

const createDir = require('../createDir')

const archiveUrl = 'https://github.com/electron/electron/releases/download/v1.6.13/electron-v1.6.13-win32-ia32.zip'

module.exports = {
  archiveUrl: archiveUrl,
  prepareApp: prepareApp,
}

function prepareApp(outputDir, appName) {
  const appDir = path.join(outputDir, 'resources/app')
  const source = path.join(outputDir, 'electron.exe')
  const dest = path.join(outputDir, `${appName}.exe`) 

  return Promise.all([
    renameExe(outputDir, appName),
    createDir(appDir)
  ]).then(() => appDir)
}

function renameExe(outputDir, appName) {
  const source = path.join(outputDir, 'electron.exe')
  const dest = path.join(outputDir, `${appName}.exe`) 

  return new Promise((resolve, reject) => {
    fs.rename(source, dest, (err) => {
      if (err) { reject(err) }
      else { resolve() }
    })
  })
}
