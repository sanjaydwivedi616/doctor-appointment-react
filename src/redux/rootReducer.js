import { combineReducers } from 'redux'
import addSlotReducer from './addSlote/addSlotReducer';
import userReducer from './login/loginReducer'

const rootReducer = combineReducers({
  user: userReducer,
  addSlotRe : addSlotReducer
})

export default rootReducer;
