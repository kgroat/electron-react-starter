
const path = require('path')
const fs = require('fs')
const plist = require('plist')
const ncp = require('ncp')

const package = require('../../../package.json')

const createDir = require('../createDir')
const copyFile = require('../copyFile')

const archiveUrl = (version) => `https://github.com/electron/electron/releases/download/v${version}/electron-v${version}-darwin-x64.zip`

module.exports = {
  archiveUrl: archiveUrl,
  prepareApp: prepareApp,
}

function prepareApp (outputDir, appName) {
  const appDir = path.join(outputDir, 'Electron.app')
  const newAppDir = path.join(outputDir, `${appName}.app`)
  const destDir = path.join(newAppDir, 'Contents/Resources/app')
  
  return Promise.all([
    copyIcon(appDir, appName),
    updateApp(appDir, appName),
    updateHelper(appDir, appName),
    updateHelperEH(appDir, appName),
    updateHelperNp(appDir, appName)
  ])
  .then(() => renameApp(outputDir, appName))
  .then(() => createDir(destDir))
  .then(() => destDir)
}

function renameApp(outputDir, appName) {
  return rename(outputDir, {
    source: 'Electron.app',
    dest: `${appName}.app`
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

function copyIcon(appDir, appName) {
  return copyFile(
    path.join(__dirname, '../../../intermediates/icons/mac/icon.icns'),
    path.join(appDir, 'Contents/Resources/icon.icns')
  )
}

function updateApp(appDir, appName) {
  return updateInfoPlist(appDir, appName)
    .then(() => rename(path.join(appDir, 'Contents/MacOS'), {
      source: 'Electron',
      dest: appName
    }))
}

function updateInfoPlist(appDir, appName) {
  const location = path.join(appDir, 'Contents/Info.plist')
  return modifyPlist(location, {
    'CFBundleDisplayName': appName,
    'CFBundleExecutable': appName,
    'CFBundleName': appName,
    'CFBundleIdentifier': package.identifier,
    'CFBundleShortVersionString': package.version,
    'CFBundleVersion': package.version,
    'CFBundleIconFile': 'icon.icns',
  })
}

function updateHelper(appDir, appName) {
  const bundleName = `${appName} Helper`
  const bundleLocation = path.join(appDir, 'Contents/Frameworks')
  const bundleDir = path.join(bundleLocation, 'Electron Helper.app')
  return updateHelperInfoPlist(bundleDir, bundleName)
    .then(() => rename(path.join(bundleDir, 'Contents/MacOS'), {
      source: 'Electron Helper',
      dest: bundleName
    }))
    .then(() => rename(bundleLocation, {
      source: 'Electron Helper.app',
      dest: `${bundleName}.app`
    }))
}

function updateHelperInfoPlist(appDir, appName) {
  const location = path.join(appDir, 'Contents/Info.plist')
  return modifyPlist(location, {
    'CFBundleName': `${appName} Helper`,
  })
}

function updateHelperEH(appDir, appName) {
  const bundleName = `${appName} Helper EH`
  const bundleLocation = path.join(appDir, 'Contents/Frameworks')
  const bundleDir = path.join(bundleLocation, 'Electron Helper EH.app')
  return updateHelperEHInfoPlist(bundleDir, bundleName)
    .then(() => rename(path.join(bundleDir, 'Contents/MacOS'), {
      source: 'Electron Helper EH',
      dest: bundleName
    }))
    .then(() => rename(bundleLocation, {
      source: 'Electron Helper EH.app',
      dest: `${bundleName}.app`
    }))
}

function updateHelperEHInfoPlist(appDir, appName) {
  const bundleName = `${appName} Helper EH`
  const location = path.join(appDir, 'Contents/Info.plist')
  return modifyPlist(location, {
    'CFBundleDisplayName': bundleName,
    'CFBundleExecutable': bundleName,
    'CFBundleName': bundleName,
  })
}

function updateHelperNp(appDir, appName) {
  const bundleName = `${appName} Helper NP`
  const bundleLocation = path.join(appDir, 'Contents/Frameworks')
  const bundleDir = path.join(bundleLocation, 'Electron Helper NP.app')
  return updateHelperNPInfoPlist(bundleDir, bundleName)
    .then(() => rename(path.join(bundleDir, 'Contents/MacOS'), {
      source: 'Electron Helper NP',
      dest: bundleName
    }))
    .then(() => rename(bundleLocation, {
      source: 'Electron Helper NP.app',
      dest: `${bundleName}.app`
    }))
}

function updateHelperNPInfoPlist(bundleDir, bundleName) {
  const location = path.join(bundleDir, 'Contents/Info.plist')
  return modifyPlist(location, {
    'CFBundleDisplayName': bundleName,
    'CFBundleExecutable': bundleName,
    'CFBundleName': bundleName,
  })
}

function modifyPlist(location, mapping) {
  return new Promise((resolve, reject) => {
    fs.readFile(location, (err, content) => {
      if (err) { return reject(err) }
      content = content.toString()
      const info = plist.parse(content)
      for (var key in mapping) {
        if (mapping.hasOwnProperty(key)) {
          info[key] = mapping[key]
        }
      }
      content = plist.build(info)
      fs.writeFile(location, content, err => {
        if (err) { reject(err) }
        else { resolve() }
      })
    })
  })
}
