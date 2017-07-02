import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { stockReducer, loaderReducer, errorReducer } from './reducers'

const rootReducer = combineReducers({
  stocks: stockReducer,
  fetching: loaderReducer,
  routing: routerReducer,
  error: errorReducer
})

export default rootReducer
