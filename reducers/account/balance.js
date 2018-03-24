
const initialState = {
  balanceOperations: [],
  currentBalance: '0.0000000',
}

const createAccountReducer = (state, accountId, op) => {
  if (accountId === op.account) { // This is account being created
    let balanceOperation = {
      operationRef: op.id,
      date: op.createdAt,
      amount: op.startingBalance
    }
    return {
      ...state,
      balanceOperations: [...state.balanceOperations, balanceOperation],
      currentBalance: balanceOperation.amount
    }
  }
}

const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CREATE_ACCOUNT_OPERATION':
      return createAccountReducer(state, action.accountId, action.operation)
    case 'ADD_ACCOUNT_MERGE_OPERATION':
      let balanceOperation = {
        operationRef: action.operation.id,
        date: action.operation.createdAt,
        amount: action.operation.startingBalance
      }
      return {
        ...state,
        balanceOperations: [...state.balanceOperations, balanceOperation],
        currentBalance: balanceOperation.amount
      }
    default:
      return state
  }
}

export default balanceReducer
