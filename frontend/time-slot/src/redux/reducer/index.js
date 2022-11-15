
import { combineReducers } from 'redux'
import slot from './slot.reducer'

const rootReducer = combineReducers({
  slotReducer:slot,
})

export default rootReducer