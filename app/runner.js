
const Observable = require('rxjs/observable').Observable
const log = require('electron-log')

const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

module.exports = function(root, appName) {
  return new Observable(subscriber => {
    log.info('starting app with root', root)
    function createWindow() {
      log.info('creating window...')
      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 400,
        minHeight: 400,
        title: appName
      })
      const windowUrl = path.join(root, 'index.html')
      log.info('url', windowUrl)
      mainWindow.loadURL(windowUrl)
      mainWindow.on('closed', function () {
        mainWindow = null
      })
      mainWindow.on('error', log.error)
      subscriber.next(mainWindow)
    }
    
    app.on('ready', createWindow)
    
    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
    
    app.on('activate', function () {
      if (mainWindow === null) {
        createWindow()
      }
    })
    app.on('error', log.error)
  })
}