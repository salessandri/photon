
import { BigDecimal } from 'bigdecimal'

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
  else if (accountId === op.funder) { // This account is the one paying to open the account
    let operationAmount = new BigDecimal(op.startingBalance).negate()
    let newBalance = new BigDecimal(state.currentBalance).add(operationAmount)

    let balanceOperation = {
      operationRef: op.id,
      date: op.createdAt,
      amount: operationAmount.toPlainString()
    }
    return {
      ...state,
      balanceOperations: [...state.balanceOperations, balanceOperation],
      currentBalance: newBalance.toPlainString()
    }
  }
  return state
}

const paymentReducer = (state, accountId, op) => {
  if (accountId === op.from) {
    let operationAmount = new BigDecimal(op.amount).negate()
    let newBalance = new BigDecimal(state.currentBalance).add(operationAmount)

    let balanceOperation = {
      operationRef: op.id,
      date: op.createdAt,
      amount: operationAmount.toPlainString()
    }
    return {
      ...state,
      balanceOperations: [...state.balanceOperations, balanceOperation],
      currentBalance: newBalance.toPlainString()
    }
  }
  else if (accountId === op.to) {
    let operationAmount = new BigDecimal(op.amount)
    let newBalance = new BigDecimal(state.currentBalance).add(operationAmount)

    let balanceOperation = {
      operationRef: op.id,
      date: op.createdAt,
      amount: operationAmount.toPlainString()
    }
    return {
      ...state,
      balanceOperations: [...state.balanceOperations, balanceOperation],
      currentBalance: newBalance.toPlainString()
    }
  }
  else {
    console.warn("Payment operation received but account is not payer nor payee")
    return state
  }
}

const accountMergeReducer = (state, accountId, op) => {
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
  return state
}

const xlmFromStroops = stroops => {
  return new BigDecimal(stroops).movePointLeft(7).setScale(7)
}

const addTransactionReducer = (state, accountId, tx) => {
  if (accountId === tx.sourceAccount) {
    // Need to pay the tx fees
    let operationAmount = xlmFromStroops(tx.fee).negate()
    let newBalance = new BigDecimal(state.currentBalance).add(operationAmount)

    let balanceOperation = {
      trasnactionRef: tx.id,
      date: tx.createdAt,
      amount: operationAmount.toPlainString()
    }
    return {
      ...state,
      balanceOperations: [...state.balanceOperations, balanceOperation],
      currentBalance: newBalance.toPlainString()
    }
  }
  return state
}

const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    // Transaction side effects on the balance
    case 'ADD_TRANSACTION':
      return addTransactionReducer(state, action.accountId, action.transaction)
    case 'ADD_CREATE_ACCOUNT_OPERATION':
      return createAccountReducer(state, action.accountId, action.operation)
    case 'ADD_PAYMENT_OPERATION':
      return paymentReducer(state, action.accountId, action.operation)
    case 'ADD_ACCOUNT_MERGE_OPERATION':
      return state
    default:
      return state
  }
}

export default balanceReducer
