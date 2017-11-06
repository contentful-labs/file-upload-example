import 'babel-polyfill'

import { h, render } from 'preact'
import Router from 'preact-router'
import { Provider } from 'preact-redux'

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import * as storage from 'redux-storage'
import createEngineLocalStorage from 'redux-storage-engine-localstorage'
import debounce from 'redux-storage-decorator-debounce'
import filter from 'redux-storage-decorator-filter'

import { createHashHistory } from 'history'

import mainSaga from 'store/mainSaga'
import reducers from 'store/reducers'
import Login from 'modules/login'
import Assets from 'modules/assets'
import Busy from 'components/busy'

import './assets/styles/base.css'

const storageEngine = debounce(
  filter(
    createEngineLocalStorage('file-upload.app'),
    [],
    [
      ['contentful', 'assets']
    ]
  ),
  300
)

const reducer = storage.reducer(reducers)

const storageMiddleware = storage.createMiddleware(storageEngine)
const sagaMiddleware = createSagaMiddleware()

const middlewares = [storageMiddleware, sagaMiddleware]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares))
)

const load = storage.createLoader(storageEngine)
load(store)
  .then((newState) => {
    sagaMiddleware.run(mainSaga)
  })

render(
  <Provider store={store}>
    <div>
      <Router history={createHashHistory()}>
        <Login path={'/'} />
        <Assets path={'/assets'} />
      </Router>
      <Busy />
    </div>
  </Provider>,
  document.getElementById('app')
)
