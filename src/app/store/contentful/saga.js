import { takeLatest } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { route } from 'preact-router'
import swal from 'sweetalert'
import 'sweetalert/dist/sweetalert.css'

import * as actions from './actions'
import { setBusyState, setBusyMessage } from 'store/busy/actions'
import * as selectors from './selectors'
import { initClient, fetchAssets, createAssetFromFile } from '../api'

function * initClientSaga (action) {
  try {
    yield put(setBusyState({state: true}))
    yield put(setBusyMessage({message: 'Initializing CMA Client'}))
    const accessToken = yield select(selectors.selectAccessToken)
    const spaceId = yield select(selectors.selectSpaceId)

    if (!accessToken || !spaceId) {
      throw new Error('AccessToken and SpaceID must be provided.')
    }

    yield initClient(accessToken, spaceId)
    yield put(actions.INIT_CLIENT.success())
    yield put(actions.DISPLAY_ASSETS.request())
  } catch (error) {
    yield put(setBusyState({state: false}))
    console.error(error)
    swal({
      title: 'An error occured 😱',
      text: error.message,
      type: 'error'
    })
    yield put(actions.INIT_CLIENT.failure(error.message))
  }
}

function * displayAssetsSaga (action) {
  try {
    yield put(setBusyState({state: true}))
    yield put(setBusyMessage({message: 'Loading Assets...'}))
    const assets = yield call(fetchAssets)
    yield put(actions.setAssets({assets}))
    route(`${APP_CONFIG.paths.webpackPublicPath}assets`)
    yield put(actions.DISPLAY_ASSETS.success())
    yield put(setBusyState({state: false}))
  } catch (error) {
    yield put(setBusyState({state: false}))
    swal(error)
    window.alert({
      title: 'An error occured 😱',
      text: error.message,
      type: 'error'
    })
    yield put(actions.DISPLAY_ASSETS.failure(error.message))
  }
}

function * uploadSaga (action) {
  try {
    const { files } = action.data

    yield put(setBusyState({state: true}))
    yield put(setBusyMessage({message: `Uploading ${files.length} files...`}))
    const assets = yield Promise.all(
      files.map((file) => createAssetFromFile(file))
    )
    yield put(actions.addAssets({assets}))
    yield put(actions.UPLOAD_FILES.success())
    yield put(setBusyState({state: false}))
  } catch (error) {
    yield put(setBusyState({state: false}))
    console.error(error)
    swal({
      title: 'An error occured 😱',
      text: error.message,
      type: 'error'
    })
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
