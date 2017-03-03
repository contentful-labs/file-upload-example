import { name } from './config'

import { createDeltaAction, createActionCreator } from 'store/utils'

export const SET_BUSY_STATE = createDeltaAction(name, 'SET_BUSY_STATE')
export const setBusyState = createActionCreator(SET_BUSY_STATE)

export const SET_BUSY_MESSAGE = createDeltaAction(name, 'SET_BUSY_MESSAGE')
export const setBusyMessage = createActionCreator(SET_BUSY_MESSAGE)
