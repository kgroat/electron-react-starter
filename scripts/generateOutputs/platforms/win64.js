
const path = require('path')
const fs = require('fs')
const rcedit = require('rcedit')

const createDir = require('../createDir')
const copyFile = require('../copyFile')
const pkg = require('../../../package.json')

const archiveUrl = (version) => `https://github.com/electron/electron/releases/download/v${version}/electron-v${version}-win32-x64.zip`

module.exports = {
  archiveUrl: archiveUrl,
  prepareApp: prepareApp,
}

function prepareApp(outputDir, appName) {
  const appDir = path.join(outputDir, 'resources/app')
  const source = path.join(outputDir, 'electron.exe')
  const dest = path.join(outputDir, `${appName}.exe`) 

  return Promise.all([
    copyWinIcon(outputDir),
    copyPngIcons(outputDir),
    renameExe(outputDir, appName),
    createDir(appDir)
  ])
  .then(() => updateIcon(outputDir, appName))
  .then(() => appDir)
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

function copyWinIcon(outputDir) {
  return copyFile(
    path.join(__dirname, '../../../intermediates/icons/win/icon.ico'),
    path.join(outputDir, 'icon.ico')
  )
}

function copyPngIcons(outputDir) {
  return copyFile(
    path.join(__dirname, '../../../intermediates/icons/png'),
    path.join(outputDir, 'resources/icons')
  )
}

function updateIcon(outputDir, appName) {
  const source = path.join(outputDir, `${appName}.exe`)

  return new Promise((resolve, reject) => {
    rcedit(source, {
      'product-version': pkg.version,
      'icon': path.join(__dirname, '../../../intermediates/icons/win/icon.ico'),
    }, (err) => {
      if (err) { reject(err) }
      else { resolve() }
    })
  })
}
