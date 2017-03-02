import { fork } from 'redux-saga/effects'
import contentfulSaga from './contentful/saga'

export default function * mainSaga () {
  yield fork(contentfulSaga)
}
