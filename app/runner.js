
const Observable = require('rxjs/observable').Observable

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
    console.log('starting app with root', root)
    function createWindow() {
      console.log('creating window...')
      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: appName
      })
      const windowUrl = `${root}/index.html`
      console.log('url', windowUrl)
      mainWindow.loadURL(windowUrl)
      mainWindow.on('closed', function () {
        mainWindow = null
      })
      mainWindow.on('error', console.error)
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
    app.on('error', console.error)
  })
}