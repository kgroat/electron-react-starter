
const fs = require('fs')
const path = require('path')
const ncp = require('ncp')
const package = require('../../package.json')

const debug = require('./debug')
const copyFile = require('./copyFile')

module.exports = function copyAppContent (platform, contentDir) {
  debug(platform, 'Copying app content...')
  return Promise.all([
    copyApp(contentDir),
    copyBundle(contentDir),
    copyPackage(contentDir),
  ])
  .then(() => {
    debug(platform, 'Done!')
  })
}

function copyApp(contentDir) {
  const inputFile = path.join(__dirname, '../../intermediates/app/index.js')
  const targetFile = path.join(contentDir, 'index.js')
  return copyFile(inputFile, targetFile)
}

function copyBundle(contentDir) {
  const inputFile = path.join(__dirname, '../../intermediates/bundle.asar')
  const targetFile = path.join(contentDir, 'bundle.asar')
  return copyFile(inputFile, targetFile)
}

function copyPackage(contentDir) {
  const targetFile = path.join(contentDir, 'package.json')
  return new Promise((resolve, reject) => {
    const modified = Object.assign({}, package)
    delete modified.scripts
    delete modified.devDependencies
    const output = JSON.stringify(modified)

    fs.writeFile(targetFile, output, err => {
      if (err) { reject(err) }
      else { resolve() }
    })
  })
}
