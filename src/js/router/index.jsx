import React from 'react'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'

import Base from '../components/Base'
import HomePage from '../components/HomePage'

import NotFoundPage from '../components/NotFoundPage'

export function getRoutes (store) {
  return (
    <Route path='/' component={Base}>
      <IndexRoute component={HomePage} />
      <Route path='*' component={NotFoundPage} />
    </Route>
  )
}
