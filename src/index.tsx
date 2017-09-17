
import * as React from 'react'
import { render } from 'react-dom'

import App from './containers/App'

import './globalStyles/index.scss'

const rootElement = document.getElementById('app')

render(<App />, rootElement)
