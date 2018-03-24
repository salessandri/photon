
import { BigDecimal } from 'bigdecimal'

const initialState = {
  operationsById: {},
  lastOperationId: undefined
}

const operationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CREATE_ACCOUNT_OPERATION':
    case 'ADD_ACCOUNT_MERGE_OPERATION':
      let op = action.operation
      let lastOperationId = new BigDecimal(state.lastOperationId ? state.lastOperationId : '0')
      let opIdBigDecimal = new BigDecimal(op.id)
      if (opIdBigDecimal.compareTo(lastOperationId) > 0) {
        lastOperationId = opIdBigDecimal
      }
      return {
        ...state,
        lastOperationId: lastOperationId.toPlainString(),
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
