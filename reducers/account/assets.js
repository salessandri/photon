
import { BigDecimal } from 'bigdecimal'

const initialBalanceState = {
  balance: '0.0000000',
  balanceMovements: []
}

const initialAssetsState = {
  assetsBalanceById: {}
}

const assetsReducer = (state = initialAssetsState, action) => {
  switch (action.type) {
  default:
    return state
  }
}

export default assetsReducer
