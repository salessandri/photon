
import { combineReducers } from 'redux'

import infoReducer from './info'
import operationsReducer from './operations'
import stateReducer from './state'

const accountReducer = combineReducers({
  info: infoReducer,
  state: stateReducer,
  operations: operationsReducer
})

export default accountReducer
