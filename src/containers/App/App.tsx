
import * as React from 'react'
import { Provider } from 'react-redux'

import store from '../../redux/store'

import './App.scss'

export default () => {
  return (
    <Provider store={store}>
      <div className='app-component'>
        <h1>Hello, world!</h1>
      </div>
    </Provider>
  )
}
