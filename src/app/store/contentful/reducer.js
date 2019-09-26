import { initialState } from './config'
import * as actions from './actions'

export default function contentfulReducer (state = initialState, action) {
  const { type, data } = action

  if (type === actions.SET_ACCESS_TOKEN) {
    const { accessToken } = data

    return {
      ...state,
      accessToken
    }
  }
  if (type === actions.SET_ENVRIONMENT) {
    const { environment } = data

    return {
      ...state,
      environment
    }
  }
  if (type === actions.SET_SPACE_ID) {
    const { spaceId } = data

    return {
      ...state,
      spaceId
    }
  }
  if (type === actions.SET_HOST) {
    const { host } = data

    return {
      ...state,
      host
    }
  }
  if (type === actions.SET_UPLOAD_HOST) {
    const { hostUpload } = data

    return {
      ...state,
      hostUpload
    }
  }

  if (type === actions.SET_ASSETS) {
    const { assets } = data

    return {
      ...state,
      assets
    }
  }

  if (type === actions.ADD_ASSETS) {
    const { assets } = data

    return {
      ...state,
      assets: [
        ...assets,
        ...state.assets
      ]
    }
  }

  return state
}
