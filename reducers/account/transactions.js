
import { BigDecimal } from 'bigdecimal'

const initialState = {
  transactionsById: {},
  ownTransactionsBySeqNumber: {},
  currentPagingToken: undefined
}

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_TRANSACTION':
  {
    let tx = action.transaction
    let currentPagingTokenBigDecimal =
      new BigDecimal(state.currentPagingToken ? state.currentPagingToken : '0')
    let txPagingTokenBigDecimal = new BigDecimal(tx.pagingToken)
    if (txPagingTokenBigDecimal.compareTo(currentPagingTokenBigDecimal) > 0) {
      currentPagingTokenBigDecimal = txPagingTokenBigDecimal
    }
    let newState = {
      ...state,
      currentPagingToken: currentPagingTokenBigDecimal.toPlainString(),
      transactionsById: {
        ...state.transactionsById,
        [tx.id]: tx
      }
    }
    if (action.accountId === tx.sourceAccount) {
      newState = {
        ...newState,
        ownTransactionsBySeqNumber: {
          ...newState.ownTransactionsBySeqNumber,
          [tx.sequenceNumber]: tx.id
        }
      }
    }
    return newState
  }
  default:
    return state
  }
}

export default transactionsReducer
