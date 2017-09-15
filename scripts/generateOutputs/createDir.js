
const fs = require('fs')

module.exports = function createDir(dir) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dir)) {
      return resolve()
    }

    fs.mkdir(dir, err => {
      if (err) { reject(err) }
      else { resolve() }
    })
  })
}
