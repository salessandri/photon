
import accountReducer from './account'

const accounts = (state = {}, action) => {
  switch (action.type) {
  case 'ADD_ACCOUNT':
    return {
      ...state,
      [action.id]: accountReducer(undefined, action)
    }
  case 'UPDATE_ACCOUNT':
  {
    let updatedAccount = {
      ...state[action.id],
      name: action.name
    }
    return {
      ...state,
      [action.id]: updatedAccount
    }
  }
  case 'DELETE_ACCOUNT':
  {
    let { [action.id]: _, ...newState } = state
    return newState
  }
  case 'ADD_TRANSACTION':
  case 'ADD_OPERATION':
    return {
      ...state,
      [action.accountId]: accountReducer(state[action.accountId], action)
    }
  default:
    return state
  }
}

export default accounts
