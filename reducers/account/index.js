
import { combineReducers } from 'redux'

import infoReducer from './info'
import operationsReducer from './operations'
import stateReducer from './state'
import transactionsReducer from './transactions'

const accountReducer = combineReducers({
  info: infoReducer,
  state: stateReducer,
  transactions: transactionsReducer,
  operations: operationsReducer
})

export default accountReducer
