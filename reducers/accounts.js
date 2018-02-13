
const accounts = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      return {
        ...state,
        [action.id]: {
          id: action.id,
          name: action.name,
          privateKey: action.privateKey
        }
      }
    case 'UPDATE_ACCOUNT':
      let updatedAccount = {
        ...state[action.id],
        name: action.name
      }
      return {
        ...state,
        [action.id]: updatedAccount
      }
    case 'DELETE_ACCOUNT':
      let {[action.id]: omit, ...newState} = state
      return newState
    default:
      return state
  }
}

export default accounts
