import { takeLatest } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { route } from 'preact-router'

import * as actions from './actions'
import * as selectors from './selectors'
import { initClient, fetchAssets, createAssetFromFile } from '../api'

function * initClientSaga (action) {
  try {
    const accessToken = yield select(selectors.selectAccessToken)
    const spaceId = yield select(selectors.selectSpaceId)

    if (!accessToken || !spaceId) {
      throw new Error('AccessToken and SpaceID must be provided.')
    }

    yield initClient(accessToken, spaceId)
    yield put(actions.INIT_CLIENT.success())
    yield put(actions.DISPLAY_ASSETS.request())
  } catch (error) {
    console.error(error)
    yield put(actions.INIT_CLIENT.failure(error.message))
  }
}

function * displayAssetsSaga (action) {
  try {
    const assets = yield call(fetchAssets)
    yield put(actions.setAssets({assets}))
    route(`${APP_CONFIG.paths.webpackPublicPath}assets`)
    yield put(actions.DISPLAY_ASSETS.success())
  } catch (error) {
    console.error(error)
    yield put(actions.DISPLAY_ASSETS.failure(error.message))
  }
}

function * uploadSaga (action) {
  try {
    const { files } = action.data
    const assets = yield Promise.all(
      files.map((file) => createAssetFromFile(file))
    )
    yield put(actions.addAssets({assets}))
    yield put(actions.UPLOAD_FILES.success())
  } catch (error) {
    console.error(error)
    yield put(actions.UPLOAD_FILES.failure(error.message))
  }
}

export default function * watchFetchData () {
  yield [
    takeLatest(actions.INIT_CLIENT.REQUEST, initClientSaga),
    takeLatest(actions.DISPLAY_ASSETS.REQUEST, displayAssetsSaga),
    takeLatest(actions.UPLOAD_FILES.REQUEST, uploadSaga)
  ]
}
