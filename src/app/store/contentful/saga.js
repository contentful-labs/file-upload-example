import { takeLatest } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import * as actions from './actions'

import * as selectors from './selectors'

import { initClient, fetchAssets } from '../api'

function * initClientSaga (action) {
  try {
    const accessToken = yield select(selectors.selectAccessToken)
    const spaceId = yield select(selectors.selectSpaceId)

    if (!accessToken || !spaceId) {
      yield put(actions.INIT_CLIENT.failure())
      return
    }

    yield initClient(accessToken, spaceId)
    yield put(actions.INIT_CLIENT.success())
  } catch (error) {
    console.error(error)
    yield put(actions.INIT_CLIENT.failure())
  }
}

function * displayAssetsSaga (action) {
  try {
    const data = yield call(fetchAssets)
    yield put(actions.setAssets(data))
    yield put(actions.DISPLAY_ASSETS.success())
  } catch (error) {
    console.error(error)
    yield put(actions.DISPLAY_ASSETS.failure())
  }
}

export default function * watchFetchData () {
  yield [
    takeLatest(actions.INIT_CLIENT.REQUEST, initClientSaga),
    takeLatest(actions.DISPLAY_ASSETS.REQUEST, displayAssetsSaga)
  ]
}
