import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {enableBatching} from 'redux-batched-actions'

import rootReducer from '../reducers'

const composeStore = compose(
  applyMiddleware(thunk)
)(createStore)

export default (initialState = {}) => {
  const store = composeStore(enableBatching(rootReducer), initialState)

  return store
}
