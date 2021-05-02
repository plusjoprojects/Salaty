import UserReducers from './User/UserReducers'
import SettingsReducers from './Settings/SettingsReducers'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  user: UserReducers,
  settings:SettingsReducers,
});

export default rootReducer;