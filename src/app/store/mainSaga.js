import { spawn } from 'redux-saga/effects'

function * initSaga () {
}

export default function * mainSaga () {
  yield spawn(initSaga)
}
