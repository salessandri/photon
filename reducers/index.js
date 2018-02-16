import { combineReducers } from 'redux'
import accounts from './accounts'
import activeAccount from './activeAccount'

const photonApp = combineReducers({
  accounts,
  activeAccount
})

export default photonApp
