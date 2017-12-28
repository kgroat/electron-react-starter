
const ncp = require('ncp')

module.exports = function copyFile(inputLocation, outputLocation) {
  return new Promise((resolve, reject) => {
    ncp(inputLocation, outputLocation, err => {
      if (err) { reject(err) }
      else { resolve() }
    })
  })
}
