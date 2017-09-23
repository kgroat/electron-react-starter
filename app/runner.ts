
import { Observable } from 'rxjs/Observable'
import * as log from 'electron-log'
import { app, BrowserWindow, Menu } from 'electron'
import * as path from 'path'
import * as url from 'url'

import config from './config'
import store from './redux'
import menu from './menu'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

export default (root) => {
  return new Observable<Electron.BrowserWindow>(subscriber => {
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
      mainWindow.on('closed', () => {
        mainWindow = null
      })
      mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.setLayoutZoomLevelLimits(-2, 2)
      })
      mainWindow.webContents.on('crashed', log.error)
      mainWindow.webContents.on('did-fail-load', log.error)
      mainWindow.webContents.on('plugin-crashed', log.warn)

      log.info('url', windowUrl)
      mainWindow.loadURL(windowUrl)
      subscriber.next(mainWindow)
    }
    
    app.on('ready', () => {
      createWindow()
      Menu.setApplicationMenu(menu)
    })
    
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
    
    app.on('activate', () => {
      if (mainWindow === null) {
        createWindow()
      }
    })
  })
}