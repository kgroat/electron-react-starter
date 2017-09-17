import { configure } from '@storybook/react'
import '../src/globalStyles/index.scss'

function loadStories() {
  const req = require.context('../src', true, /\.story.[jt]sx?$/)
  req.keys().forEach(key => {
    req(key)
  })
}

configure(loadStories, module)
