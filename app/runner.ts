
import { Observable } from 'rxjs/Observable'
import * as log from 'electron-log'
import { app, BrowserWindow, Menu } from 'electron'
import * as path from 'path'

import config from './config'
import menu from './menu'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

export default (root) => {
  return new Observable<Electron.BrowserWindow>(subscriber => {
    log.info('starting app with root', root)

    function createWindow () {
      log.info('creating window...')

      // Create the electron window
      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 400,
        minHeight: 400,
        title: config.appName,
        icon: './icons/64x64.png',
        show: false,
      })

      const windowUrl = path.join(root, 'index.html')
      log.info('url', windowUrl)

      // Clear the ref to the main window whenever it is closed
      mainWindow.on('closed', () => {
        mainWindow = null
      })

      // Fired whenever all files finished loading, but before the app has been rendered for the first time
      mainWindow.webContents.on('did-finish-load', () => {
        mainWindow && mainWindow.webContents.setLayoutZoomLevelLimits(-2, 2)
      })

      // Fired whenever the app is finished rendering for the first time
      mainWindow.on('ready-to-show', () => {
        if (mainWindow) {
          // Show the window only after first render
          mainWindow.show()

          // Tell the caller that a window has been opened
          subscriber.next(mainWindow)
        }
      })

      // Pass any errors or warnings into the logger
      mainWindow.webContents.on('crashed', log.error)
      mainWindow.webContents.on('did-fail-load', log.error)
      mainWindow.webContents.on('plugin-crashed', log.warn)

      // After all listeners have been registered, then load the application
      mainWindow.loadURL(windowUrl)
    }

    // Fires when the app is ready to load
    app.on('ready', () => {
      createWindow()
      Menu.setApplicationMenu(menu)
    })

    // Except on mac: kill the app whenever all windows are closed
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    // Only on mac: whenever the icon is clicked
    app.on('activate', () => {
      // Only create a window if there isn't already onw
      if (mainWindow === null) {
        createWindow()
      }
    })
  })
}
