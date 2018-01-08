
/*
 * This is the entry point used in the final, built application
 * It points the app window to the static built assets
 */

import * as path from 'path'
import runner from './runner'

const fileLocation = path.join(__dirname, './bundle.asar')
runner(`file://${fileLocation}`).subscribe()
