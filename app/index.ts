
import * as path from 'path'
import runner from './runner'

const fileLocation = path.join(__dirname, './bundle.asar')
runner(`file://${fileLocation}`).subscribe()
