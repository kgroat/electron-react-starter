
import * as React from 'react'
import { Provider } from 'react-redux'

import store from '../../redux/store'
import TodoArea from 'containers/TodoArea'

import { appComponent } from './App.scss'

export default () => {
  return (
    <Provider store={store}>
      <div className={appComponent}>
        <TodoArea />
      </div>
    </Provider>
  )
}
