
import { createStore, applyMiddleware, compose } from 'redux'
import { autoRehydrate, persistStore } from 'redux-persist'
import { forwardToRenderer, triggerAlias, replayActionMain } from 'electron-redux'
import { createLogger } from 'redux-logger'
import * as log from 'electron-log'
import rootReducer from '../src/redux/rootReducer'

const logger = createLogger({
  level: 'info',
  timestamp: true,
  logErrors: true,
  logger: {
    log: log.debug,
    debug: log.debug,
    error: log.error,
    warn: log.warn,
    info: log.info
  }
})

log.debug('got here')
console.log('here, too')

const store = createStore(
  rootReducer,
  compose(
    autoRehydrate(),
    applyMiddleware(
      triggerAlias,
      logger,
      forwardToRenderer
    )
  )
)

replayActionMain(store)
persistStore(store)

export default store
