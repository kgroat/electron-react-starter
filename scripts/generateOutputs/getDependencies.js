
const fs = require('fs')
const path = require('path')
const npm = require('npm')

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
    const cwd = process.cwd()
    process.chdir(outputDir)
    npm.load(err => {
      if (err) { reject(err) }
      npm.commands.prefix([outputDir], err => {
        if (err) { reject(err) }
        npm.commands.install(getDependencyTags(), (err, res1, res2, res3, res4, res5, res6) => {
          if (err) { reject(err) }
          else {
            console.log('Dependencies installed!')
            process.chdir(cwd)
            resolve()
          }
        })
      })
    })
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
