
let defaultState = {
  accountId: null,
}
const activeAccount = (state = defaultState, action) => {
  switch (action.type) {
  case 'SELECT_ACCOUNT':
    return {
      ...state,
      accountId: action.id
    }
  default:
    return state
  }
}

export default activeAccount
