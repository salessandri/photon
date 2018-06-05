
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

const processEffect = (state, action, effect) => {
  if (effect.account !== action.accountId) {
    return state
  }
  switch (effect.type) {
    case 'account_created':
    {
      let assetId = generateBalanceId('native', undefined, undefined)
      let balanceMovement = {
        operationId: action.operation.id,
        date: action.operation.createdAt,
        amount: effect.startingBalance
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
    case 'account_credited':
    {
      let assetId = generateBalanceId(effect.assetType, effect.assetIssuer, effect.assetCode)
      let balanceMovement = {
        operationId: action.operation.id,
        date: action.operation.createdAt,
        amount: new BigDecimal(effect.amount).toPlainString()
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
    case 'account_debited':
    {
      let assetId = generateBalanceId(effect.assetType, effect.assetIssuer, effect.assetCode)
      let balanceMovement = {
        operationId: action.operation.id,
        date: action.operation.createdAt,
        amount: new BigDecimal(effect.amount).negate().toPlainString()
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
    case 'trade':
    {
      let soldAssetId = generateBalanceId(
        effect.soldAssetType,
        effect.soldAssetIssuer,
        effect.soldAssetCode
      )
      let soldAmount = effect.soldAmount
      let boughtAssetId = generateBalanceId(
        effect.boughtAssetType,
        effect.boughtAssetIssuer,
        effect.boughtAssetCode
      )
      let boughtAmount = effect.boughtAmount

      if (effect.seller !== effect.account) {
        soldAssetId = [boughtAssetId, boughtAssetId = soldAssetId][0];
        soldAmount = [boughtAmount, boughtAmount = soldAmount][0];
      }

      let sellBalanceMovement = {
        operationId: action.operation.id,
        date: action.operation.createdAt,
        amount: new BigDecimal(soldAmount).negate().toPlainString()
      }
      let newSoldAssetBalanceState = processBalanceMovement(
        state.assetsBalanceById[soldAssetId],
        sellBalanceMovement
      )
      let buyBalanceMovement = {
        operationId: action.operation.id,
        date: action.operation.createdAt,
        amount: new BigDecimal(boughtAmount).toPlainString()
      }
      let newBoughtAssetBalanceState = processBalanceMovement(
        state.assetsBalanceById[boughtAssetId],
        buyBalanceMovement
      )
      return {
        ...state,
        assetsBalanceById: {
          ...state.assetsBalanceById,
          [soldAssetId]: newSoldAssetBalanceState,
          [boughtAssetId]: newBoughtAssetBalanceState
        }
      }
    }
    default:
      return state
  }
}

const processPathPaymentOperation = (state, action) => {
  let operation = action.operation
  let accountId = action.accountId

  if (operation.sourceAccount === accountId) {
    let sourceAssetTrade = action.effects.filter(effect => {
      return (effect.type === 'trade') &&
        (operation.sourceAssetType === effect.soldAssetType) &&
        (operation.sourceAssetIssuer === effect.soldAssetIssuer) &&
        (operation.sourceAssetCode === effect.soldAssetCode)
    })[0]

    let assetId = generateBalanceId(
      operation.sourceAssetType,
      operation.sourceAssetIssuer,
      operation.sourceAssetCode
    )

    let balanceMovement = {
      operationId: operation.id,
      date: operation.createdAt,
      amount: new BigDecimal(sourceAssetTrade.soldAmount).negate().toPlainString()
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
  else if (operation.to === accountId) {
    let assetId = generateBalanceId(
      operation.destinationAssetType,
      operation.destinationAssetIssuer,
      operation.destinationAssetCode
    )

    let balanceMovement = {
      operationId: operation.id,
      date: operation.createdAt,
      amount: new BigDecimal(operation.destinationAmount).toPlainString()
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
  else {
    console.error("ASDASDASDASD")
    return action.effects.reduce((currentState, effect) => {
      return processEffect(currentState, action, effect)
    }, state)
  }
}

const processOperation = (state, action) => {
  if (action.operation.type === 'path_payment') {
    return processPathPaymentOperation(state, action)
  }
  return action.effects.reduce((currentState, effect) => {
    return processEffect(currentState, action, effect)
  }, state)
}

const assetsReducer = (state = initialAssetsState, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return processAddTransaction(state, action)
    case 'ADD_OPERATION':
      return processOperation(state, action)
    default:
      return state
  }
}

export default assetsReducer
