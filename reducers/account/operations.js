
const initialState = {
  operationsById: {},
  lastOperationId: undefined
}

const operationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CREATE_ACCOUNT_OPERATION':
    case 'ADD_ACCOUNT_MERGE_OPERATION':
      let op = action.operation
      return {
        ...state,
        lastOperationId: max(state.lastOperationId, op.id),
        operationsById: {
          ...state.operationsById,
          [op.id]: op
        }
      }
    default:
      return state
  }
}

export default operationsReducer
