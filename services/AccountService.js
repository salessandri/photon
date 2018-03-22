import { Connect } from 'redux-ddd';

import StellarNetworkService from './StellarNetworkService'

import { addCreateAccountOperation } from '../actions'

@Connect()
class AccountService {

  // The onAction listener is called every time an action is
  // dispatched in the Redux store. It can be helpful when we
  // have logic with side-effects.
  onAction(action) {
    switch (action.type) {
    case 'ADD_ACCOUNT':
      this._startUpdateStream(action.id)
      return
    case 'DELETE_ACCOUNT':
      this._stopUpdateStream(action.id)
      return
    }
  }

  _stopUpdateStream(accountId) {

  }

  _startUpdateStream(accountId) {
    this._updateStreams[accountId] = StellarNetworkService.getServer()
      .operations()
      .forAccount(accountId)
      .stream({
        onmessage: op => { this._processOperation(accountId, op) },
        onerror: err => { this._processError(accountId, err) }
      })
  }

  _processOperation(accountId, operation) {
    switch (operation.type) {
    case 'create_account':
      this._processCreateAccount(accountId, operation)
      return
    }
  }

  _processError(err) {
    console.log('Account update error: ' + JSON.stringify(err))
  }

  _processCreateAccount(accountId, operation) {
    let modelOp = {
      id: operation.id,
      sourceAccount: operation.source_account,
      type: operation.type,
      createdAt: operation.created_at,
      transactionId: operation.transaction_hash,
      startingBalance: operation.starting_balance,
      funder: operation.funder,
      account: operation.account
    }
    let action = addCreateAccountOperation(accountId, modelOp)
    this.dispatch(action)
  }

  _updateStreams = {}

}

export default new AccountService();
