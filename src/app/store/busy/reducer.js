import { initialState } from './config'
import * as actions from './actions'

export default function busyReducer (state = initialState, action) {
  const { type, data } = action

  if (type === actions.SET_BUSY_STATE) {
    const { state } = data

    return {
      ...state,
      busy: state
    }
  }

  if (type === actions.SET_BUSY_MESSAGE) {
    const { message } = data

    return {
      ...state,
      message
    }
  }

  return state
}
