
import runner from './runner'

runner(`http://localhost:${process.env.PORT || 3000}`).subscribe(window => window.webContents.openDevTools())
