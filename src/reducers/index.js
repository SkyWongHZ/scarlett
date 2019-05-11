import { combineReducers } from 'redux'
import mainReducer from './mainReducer'
import PageDetailReducer from './PageDetailReducer'

export default combineReducers({
  mainReducer,
  PageDetailReducer
})