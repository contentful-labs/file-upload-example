import { initialState } from './config'
import * as actions from './actions'

export default function controlsReducer (state = initialState, action) {
  const { type, data } = action

  if (type === actions.SET_ACCESS_TOKEN) {
    const { accessToken } = data

    return {
      ...state,
      accessToken
    }
  }

  if (type === actions.SET_SPACE_ID) {
    const { spaceId } = data

    return {
      ...state,
      spaceId
    }
  }

  return state
}
