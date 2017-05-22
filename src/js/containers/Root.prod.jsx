import { PropTypes, default as React } from 'react'
import { Provider } from 'react-redux'
import Router from 'react-router/lib/Router'
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MyTheme from '../modules/ThemeConfig'
import { useScroll } from 'react-router-scroll'

import { getRoutes } from '../router/'

const Root = (props) => (
  <Provider store={props.store}>
    <div>
      <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
        <Router history={props.history} routes={getRoutes(props.store)} render={applyRouterMiddleware(useScroll())} />
      </MuiThemeProvider>
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root
