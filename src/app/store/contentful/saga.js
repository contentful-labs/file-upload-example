import { takeLatest } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { route } from 'preact-router'
import swal from 'sweetalert'
import 'sweetalert/dist/sweetalert.css'

import * as actions from './actions'
import { setBusyState, setBusyMessage } from 'store/busy/actions'
import * as selectors from './selectors'
import { initClient, fetchAssets, createAssetFromFile } from '../api'

async function errorHandler (error) {
  await put(setBusyState({state: false}))
  console.error(error)
  swal({
    title: 'An error occured 😱',
    text: error.message,
    type: 'error'
  })
}

function * initClientSaga (action) {
  try {
    yield put(setBusyState({state: true}))
    yield put(setBusyMessage({message: 'Initializing CMA Client'}))
    const accessToken = yield select(selectors.selectAccessToken)
    const spaceId = yield select(selectors.selectSpaceId)
    let host = yield select(selectors.selectHost)
    let hostUpload = yield select(selectors.selectHostUpload)

    host = host || 'api.contentful.com'
    hostUpload = hostUpload || 'upload.contentful.com'

    if (!accessToken || !spaceId) {
      throw new Error('AccessToken and SpaceID must be provided.')
    }

    yield initClient(accessToken, spaceId, host, hostUpload)
    yield put(actions.INIT_CLIENT.success())
    yield put(actions.DISPLAY_ASSETS.request())
  } catch (error) {
    yield errorHandler(error)
    yield put(setBusyState({state: false}))
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
    yield errorHandler(error)
    yield put(setBusyState({state: false}))
    yield put(actions.DISPLAY_ASSETS.failure(error.message))
  }
}

function * uploadSaga (action) {
  try {
    const { files } = action.data
    yield put(setBusyState({state: true}))

    let assets = []
    for (let i = 0; i < files.length; i++) {
      try {
        const file = files[i]
        yield put(setBusyMessage({message: `Uploading file (${i + 1}/${files.length})`}))
        const asset = yield createAssetFromFile(file)
        assets.push(asset)
      } catch (error) {
        yield errorHandler(error)
      }
    }

    yield put(actions.addAssets({assets}))
    yield put(actions.UPLOAD_FILES.success())
    yield put(setBusyState({state: false}))
  } catch (error) {
    yield errorHandler(error)
    yield put(setBusyState({state: false}))
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
