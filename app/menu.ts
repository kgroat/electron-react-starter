
import { Menu } from 'electron'
import config from './config'

const app: Electron.MenuItemConstructorOptions[] = [
  {label: `About ${config.appName}`, role: 'about'},
  {type: 'separator'},
  {role: 'services', submenu: []},
  {type: 'separator'},
  {role: 'hide'},
  {role: 'hideothers'},
  {role: 'unhide'},
  {type: 'separator'},
  {role: 'quit'},
]

const edit: Electron.MenuItemConstructorOptions[] = [
  {role: 'undo'},
  {role: 'redo'},
  {type: 'separator'},
  {role: 'cut'},
  {role: 'copy'},
  {role: 'paste'},
  {role: 'pasteandmatchstyle'},
  {role: 'delete'},
  {role: 'selectall'},
  {type: 'separator'},
  {
    label: 'Speech',
    submenu: [
      {role: 'startspeaking'},
      {role: 'stopspeaking'},
    ],
  },
]

const view: Electron.MenuItemConstructorOptions[] = [
  {role: 'resetzoom'},
  {role: 'zoomin'},
  {role: 'zoomout'},
  {type: 'separator'},
  {role: 'togglefullscreen'},
]

const window: Electron.MenuItemConstructorOptions[] = [
  {role: 'close'},
  {role: 'minimize'},
  {role: 'zoom'},
  {type: 'separator'},
  {role: 'front'},
]

const help: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'Learn More',
    click () { require('electron').shell.openExternal('https://electron.atom.io') },
  },
]

const template: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'Edit',
    submenu: edit,
  },
  {
    label: 'View',
    submenu: view,
  },
  {
    role: 'window',
    submenu: window,
  },
  {
    role: 'help',
    submenu: help,
  },
]

if (__DEV__) {
  view.push({
    role: 'toggledevtools',
  })
}

if (process.platform === 'darwin') {
  template.unshift({
    label: config.appName,
    submenu: app,
  })
}

const menu = Menu.buildFromTemplate(template)
export default menu
