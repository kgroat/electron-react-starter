
const fs = require('fs')
const path = require('path')
const ncp = require('ncp')

const debug = require('./debug')

module.exports = function copyAppContent (platform, contentDir) {
  debug(platform, 'Copying app content...')
  return Promise.all([
    copyAppIndex(contentDir),
    copyAppRunner(contentDir),
    copyBundle(contentDir),
    copyPackage(contentDir),
    copyProdDeps(contentDir)
  ])
  .then(() => {
    debug(platform, 'Done!')
  })
}

function copyAppIndex(contentDir) {
  const inputFile = path.join(__dirname, '../../app/index.js')
  const targetFile = path.join(contentDir, 'index.js')
  return copyFile(inputFile, targetFile)
}

function copyAppRunner(contentDir) {
  const inputFile = path.join(__dirname, '../../app/runner.js')
  const targetFile = path.join(contentDir, 'runner.js')
  return copyFile(inputFile, targetFile)
}

function copyBundle(contentDir) {
  const inputFile = path.join(__dirname, '../../intermediates/bundle.asar')
  const targetFile = path.join(contentDir, 'bundle.asar')
  return copyFile(inputFile, targetFile)
}

function copyPackage(contentDir) {
  const inputFile = path.join(__dirname, '../../package.json')
  const targetFile = path.join(contentDir, 'package.json')
  return copyFile(inputFile, targetFile)
}

function copyProdDeps(contentDir) {
  const inputDir = path.join(__dirname, '../../intermediates/node_modules')
  const targetDir = path.join(contentDir, 'node_modules')
  return copyFile(inputDir, targetDir)
}

function copyFile(inputLocation, outputLocation) {
  return new Promise((resolve, reject) => {
    ncp(inputLocation, outputLocation, err => {
      if (err) { reject(err) }
      else { resolve() }
    })
  })
}
