
import { combineReducers } from 'redux'

import assetsReducer from './assets'
import infoReducer from './info'
import operationsReducer from './operations'
import stateReducer from './state'
import transactionsReducer from './transactions'

const accountReducer = combineReducers({
  info: infoReducer,
  assets: assetsReducer,
  state: stateReducer,
  transactions: transactionsReducer,
  operations: operationsReducer
})

export default accountReducer
