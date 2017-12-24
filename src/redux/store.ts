
import { createStore } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'

import rootReducer from './rootReducer'

const store = createStore(
  rootReducer,
  autoRehydrate(),
)

persistStore(store)

export default store
