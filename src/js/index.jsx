import React from 'react'
import ReactDOM from 'react-dom'
import browserHistory from 'react-router/lib/browserHistory'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'

import configureStore from './store-configs/configureStore'
import '../styles/'

const rootEl = document.getElementById('react-app')
const initialState = {}
const store = configureStore(browserHistory, initialState)

export const history = syncHistoryWithStore(browserHistory, store)

// Setup socket event listeners to sync local redux store with server store
import stockSocketListeners from './socket-listeners/stock-listeners'
stockSocketListeners(store.dispatch)

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin()

// hot reloading
let render = () => {
  const Root = require('./containers/Root')
  ReactDOM.render(
    <Root store={store} history={history} />,
    rootEl
  )
}

if (module.hot) {
  const renderApp = render

  const renderError = (error) => {
    const RedBox = require('redbox-react').default
    ReactDOM.render(
      <RedBox error={error} />,
      rootEl
    )
  }
  render = () => {
    try {
      renderApp()
    } catch (error) {
      console.log(error)
      renderError(error)
    }
  }
  module.hot.accept('./containers/Root', () => {
    render()
  })
}
render()
