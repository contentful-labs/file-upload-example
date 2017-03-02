import { fork, select, put } from 'redux-saga/effects'
import { route } from 'preact-router'

import contentfulSaga from './contentful/saga'
import * as selectors from './contentful/selectors'
import { INIT_CLIENT } from './contentful/actions'

function * initSaga () {
  const accessToken = yield select(selectors.selectAccessToken)
  const spaceId = yield select(selectors.selectSpaceId)

  if (!accessToken || !spaceId) {
    route('/')
    return
  }

  yield put(INIT_CLIENT.request())
}

export default function * mainSaga () {
  yield fork(contentfulSaga)
  yield fork(initSaga)
}
