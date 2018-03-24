
const initialState = {
  status: 'CLOSED'
}

const stateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CREATE_ACCOUNT_OPERATION':
      let op = action.operation
      let result = state
      if (action.accountId === op.account) {
        result = {
          ...state,
          status: 'OPEN'
        }
      }
      return result
    case 'ADD_ACCOUNT_MERGE_OPERATION':
      return {
        status: 'CLOSED'
      }
    default:
      return state
  }
}

export default stateReducer
