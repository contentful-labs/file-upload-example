import { name } from './config'

import { createDeltaAction, createActionCreator } from 'store/utils'

export const SET_ACCESS_TOKEN = createDeltaAction(name, 'SET_ACCESS_TOKEN')
export const setAccessToken = createActionCreator(SET_ACCESS_TOKEN)

export const SET_SPACE_ID = createDeltaAction(name, 'SET_SPACE_ID')
export const setSpaceId = createActionCreator(SET_SPACE_ID)
