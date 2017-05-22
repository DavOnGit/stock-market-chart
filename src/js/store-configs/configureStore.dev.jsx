import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { enableBatching } from 'redux-batched-actions'
import { routerMiddleware } from 'react-router-redux'
// import { createLogger } from 'redux-logger'

import rootReducer from '../reducers'
import DevTools from '../components/DevTools'

// const logger = createLogger({diff: true})

export default (history, initialState = {}) => {
  const composeStore = compose(
    applyMiddleware(thunk, routerMiddleware(history)),
    window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
  )(createStore)

  const store = composeStore(enableBatching(rootReducer), initialState)

  if (module.hot) {
    module.hot.accept(rootReducer, () => {
      const createNextReducer = require('../reducers')
      const nextReducer = createNextReducer()

      store.replaceReducer(nextReducer)
    }
    )
  }
  return store
}
