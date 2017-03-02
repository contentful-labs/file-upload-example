import { name } from './config'

import { createSignalAction, createDeltaAction, createActionCreator } from 'store/utils'

export const SET_ACCESS_TOKEN = createDeltaAction(name, 'SET_ACCESS_TOKEN')
export const setAccessToken = createActionCreator(SET_ACCESS_TOKEN)

export const SET_SPACE_ID = createDeltaAction(name, 'SET_SPACE_ID')
export const setSpaceId = createActionCreator(SET_SPACE_ID)

export const INIT_CLIENT = createSignalAction(name, 'INIT_CLIENT')

export const DISPLAY_ASSETS = createSignalAction(name, 'DISPLAY_ASSETS')

export const SET_ASSETS = createDeltaAction(name, 'SET_ASSETS')
export const setAssets = createActionCreator(SET_ASSETS)

export const ADD_ASSETS = createDeltaAction(name, 'ADD_ASSETS')
export const addAssets = createActionCreator(ADD_ASSETS)

export const UPLOAD_FILES = createSignalAction(name, 'UPLOAD_FILES')
