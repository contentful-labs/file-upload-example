import { combineReducers } from 'redux'
import contentful from './contentful/reducer'
import busy from './busy/reducer'

export default combineReducers({
  contentful,
  busy
})
