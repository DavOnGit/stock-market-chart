import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { userReducer, loaderReducer, yelpSearchReducer } from './reducers'

const rootReducer = combineReducers({
  user: userReducer,
  yelpResults: yelpSearchReducer,
  fetching: loaderReducer,
  routing: routerReducer
})

export default rootReducer
