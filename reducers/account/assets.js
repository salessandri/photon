
import { BigDecimal } from 'bigdecimal'

const initialBalanceState = {
  balance: '0.0000000',
  movements: []
}

const initialAssetsState = {
  assetsBalanceById: {}
}

const processBalanceMovement = (state = initialBalanceState, balanceMovement) => {
  let newBalance = new BigDecimal(state.balance).add(new BigDecimal(balanceMovement.amount))
  return {
    ...state,
    balance: newBalance.toPlainString(),
    movements: [...state.movements, balanceMovement]
  }
}

const xlmFromStroops = stroops => {
  return new BigDecimal(stroops).movePointLeft(7).setScale(7)
}

const generateBalanceId = (assetType, assetIssuer, assetCode) => {
  return assetType + ':' + assetIssuer + ':' + assetCode
}

const processAddTransaction = (state, action) => {
  if (action.transaction.sourceAccount !== action.accountId) {
    return state
  }

  let assetId = generateBalanceId('native', undefined, undefined)
  let balanceMovement = {
    transactionId: action.transaction.id,
    date: action.transaction.createdAt,
    amount: xlmFromStroops(action.transaction.fee).negate().toPlainString()
  }

  let newAssetBalanceState = processBalanceMovement(
    state.assetsBalanceById[assetId],
    balanceMovement
  )

  return {
    ...state,
    assetsBalanceById: {
      ...state.assetsBalanceById,
      [assetId]: newAssetBalanceState
    }
  }

}

const assetsReducer = (state = initialAssetsState, action) => {
  switch (action.type) {
  case 'ADD_TRANSACTION':
    return processAddTransaction(state, action)
  default:
    return state
  }
}

export default assetsReducer
