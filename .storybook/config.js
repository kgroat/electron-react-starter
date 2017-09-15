import { configure } from '@storybook/react'

function loadStories() {
  const req = require.context('../src', true, /\.story.[jt]sx?$/)
  req.keys().forEach(key => {
    req(key)
  })
}

configure(loadStories, module)
