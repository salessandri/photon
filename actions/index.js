
export const addAcccount = (id, name, privateKey) => {
  return {
    type: 'ADD_ACCOUNT',
    id,
    name,
    privateKey
  }
}

export const updateAcccount = (id, name) => {
  return {
    type: 'UPDATE_ACCOUNT',
    id,
    name
  }
}

export const deleteAcccount = id => {
  return {
    type: 'DELETE_ACCOUNT',
    id
  }
}

export const selectAccount = id => {
  return {
    type: 'SELECT_ACCOUNT',
    id
  }
}

export const addTransaction = (accountId, tx) => {
  return {
    type: 'ADD_TRANSACTION',
    accountId,
    transaction: tx
  }
}

export const addCreateAccountOperation = (accountId, op) => {
  return {
    type: 'ADD_CREATE_ACCOUNT_OPERATION',
    accountId: accountId,
    operation: op
  }
}

export const addPaymentOperation = (accountId, op) => {
  return {
    type: 'ADD_PAYMENT_OPERATION',
    accountId: accountId,
    operation: op
  }
}

export const addPathPaymentOperation = (accountId, op) => {
  return {
    type: 'ADD_PATH_PAYMENT_OPERATION',
    accountId: accountId,
    operation: op
  }
}

export const addAccountMergeOperation = (accountId, op) => {
  return {
    type: 'ADD_ACCOUNT_MERGE_OPERATION',
    accountId: accountId,
    operation: op
  }
}
