const initialState = {
  status: 'CLOSED'
}

const processCreateAccount = (state, action) => {
  let accountCreatedEffect = action.effects.find(eff => { return eff.type === 'account_created' })
  if (accountCreatedEffect.account === action.accountId) {
    return {
      ...state,
      status: 'OPEN'
    }
  }
  return state
}

const processAccountMerge = (state, action) => {
  let accountRemovedEffect = action.effects.find(eff => { return eff.type === 'account_removed' })
  if (accountRemovedEffect.account === action.accountId) {
    return {
      ...state,
      status: 'CLOSED'
    }
  }
  return state
}

const stateReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_OPERATION':
  {
    switch (action.operation.type) {
    case 'create_account':
      return processCreateAccount(state, action)
    case 'account_merge':
      return processAccountMerge(state, action)
    default:
      return state
    }
  }
  default:
    return state
  }
}

export default stateReducer
