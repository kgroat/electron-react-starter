
const fs = require('fs')
const path = require('path')
const spawn = require('child_process').spawn

const package = require('../../package.json')

const rootDir = path.join()
const outputDir = path.join(__dirname, '../../intermediates')
const outputPackage = path.join(outputDir, 'package.json')

module.exports = function getDependencies() {
  return copyPackage()
    .then(install)
}


function install() {
  console.log('Installing production dependencies...')
  return new Promise((resolve, reject) => {
    const onExit = (code, signal) => {
      if (code === 0 || signal === 'SIGINT' || signal === 'SIGTERM') {
        console.log('Dependencies installed!')
        resolve()
      } else {
        reject(code || signal)
      }
    }

    const cwd = process.cwd()
    process.chdir(outputDir)
    const tags = getDependencyTags()
    const child = spawn('npm', ['install', ...tags], { stdio: 'inherit' })
    child.on('error', err => reject(err))
    child.on('exit', onExit)
    child.on('close', onExit)
  })
}

function copyPackage() {
  return new Promise((resolve, reject) => {
    fs.writeFile(outputPackage, JSON.stringify(package), {}, err => {
      if (err) { reject(err) }
      else { resolve() }
    })
  })
}

function getDependencyTags () {
  const tags = []
  const dependencies = package.dependencies
  for (var dependency in dependencies) {
    if (dependencies.hasOwnProperty(dependency)) {
      const version = dependencies[dependency]
      tags.push(`${dependency}@${version}`)
    }
  }
  return tags
}
