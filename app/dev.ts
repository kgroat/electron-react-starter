
/*
 * This is the entry point used when debugging locally
 * It points the app window to the local dev server rather than a static built asset
 * It also forces open the window's dev tools upon launch
 */

import runner from './runner'

runner(`http://localhost:${process.env.PORT || 3000}`).subscribe(window => window.webContents.openDevTools())
