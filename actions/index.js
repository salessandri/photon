
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

export const addManageOfferOperation = (accountId, op) => {
  return {
    type: 'ADD_MANAGE_OFFER_OPERATION',
    accountId: accountId,
    operation: op
  }
}

export const addCreatePassiveOfferOperation = (accountId, op) => {
  return {
    type: 'ADD_CREATE_PASSIVE_OFFER_OPERATION',
    accountId: accountId,
    operation: op
  }
}

export const addSetOptionsOperation = (accountId, op) => {
  return {
    type: 'ADD_SET_OPTIONS_OPERATION',
    accountId: accountId,
    operation: op
  }
}

export const addChangeTrustOperation = (accountId, op) => {
  return {
    type: 'ADD_CHANGE_TRUST_OPERATION',
    accountId: accountId,
    operation: op
  }
}

export const addAllowTrustOperation = (accountId, op) => {
  return {
    type: 'ADD_ALLOW_TRUST_OPERATION',
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

export const addInflationOperation = (accountId, op) => {
  return {
    type: 'ADD_INFLATION_OPERATION',
    accountId: accountId,
    operation: op
  }
}
