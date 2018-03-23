
const stateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      return {
        status: 'CLOSED'
      }
    case 'ADD_CREATE_ACCOUNT_OPERATION':
      return {
        status: 'OPEN'
      }
    case 'ADD_ACCOUNT_MERGE_OPERATION':
      return {
        status: 'CLOSED'
      }
    default:
      return state
  }
}

export default stateReducer
