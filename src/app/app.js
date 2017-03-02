import { h, render } from 'preact'
import Router from 'preact-router'

import { Provider } from 'preact-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import mainSaga from 'store/mainSaga'
import reducers from 'store/reducers'
import Login from 'modules/login'
import Assets from 'modules/assets'

import './assets/styles/base.css'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
)

sagaMiddleware.run(mainSaga)

render(
  <Provider store={store}>
    <Router>
      <Login path='/' />
      <Assets path='/assets' />
    </Router>
  </Provider>,
  document.getElementById('app')
)
