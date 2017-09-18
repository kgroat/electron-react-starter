
const Observable = require('rxjs/observable').Observable
const log = require('electron-log')

const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const config = require('./config')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

module.exports = function(root) {
  return new Observable(subscriber => {
    log.info('starting app with root', root)
    function createWindow() {
      log.info('creating window...')
      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 400,
        minHeight: 400,
        title: config.appName
      })
      const windowUrl = path.join(root, 'index.html')
      mainWindow.on('closed', function () {
        mainWindow = null
      })
      mainWindow.on('error', log.error)
      mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.setLayoutZoomLevelLimits(-2, 2)
      })
      log.info('url', windowUrl)
      mainWindow.loadURL(windowUrl)
      subscriber.next(mainWindow)
    }
    
    app.on('ready', () => {
      createWindow()
      electron.Menu.setApplicationMenu(require('./menu'))
    })
    
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