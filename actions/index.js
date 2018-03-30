
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

export const addOperation = (accountId, op) => {
  return {
    type: 'ADD_OPERATION',
    accountId: accountId,
    operation: op
  }
}
