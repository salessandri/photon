import { Connect } from 'redux-ddd';

import StellarNetworkService from './StellarNetworkService'

import { addTransaction, addCreateAccountOperation } from '../actions'

@Connect(state => ({
  accounts: state.accounts,
}))
class AccountService {

  // The onAction listener is called every time an action is
  // dispatched in the Redux store. It can be helpful when we
  // have logic with side-effects.
  onAction(action) {
    switch (action.type) {
      case 'ADD_ACCOUNT':
        this._startUpdateStream(action.id, undefined, undefined)
        return
      case 'DELETE_ACCOUNT':
        this._stopUpdateStream(action.id)
        return
    }
  }

  _stopUpdateStream(accountId) {

  }

  _startUpdateStream(accountId, operationsCursor, txCursor) {
    let operationsStream = StellarNetworkService.getServer()
      .operations()
      .forAccount(accountId)
      .cursor(operationsCursor)
      .stream({
        onmessage: op => { this._processOperation(accountId, op) },
        onerror: err => { this._processOperationError(accountId, err) }
      })
    let transactionsStream = StellarNetworkService.getServer()
      .transactions()
      .forAccount(accountId)
      .cursor(txCursor)
      .stream({
        onmessage: tx => { this._processTransaction(accountId, tx) },
        onerror: err => { this._processTransactionError(accountId, err) }
      })
    this._updateStreams[accountId] = {
      operationsStream,
      transactionsStream
    }
  }

  _processTransaction(accountId, tx) {
    let modelTx = {
      id: tx.id,
      pagingToken: tx.paging_token,
      createdAt: tx.created_at,
      sourceAccount: tx.source_account,
      sequenceNumber: tx.source_account_sequence,
      fee: tx.fee_paid,
      operationCount: tx.operation_count,
      memoType: tx.memo_type,
      signatures: tx.signatures
    }
    let addTxAction = addTransaction(accountId, modelTx)
    this.dispatch(addTxAction)
  }

  _processOperation(accountId, operation) {
    switch (operation.type) {
      case 'create_account':
        this._processCreateAccount(accountId, operation)
        return
      case 'account_merge':
        console.log('Account merge: ' + JSON.stringify(operation))
    }
  }

  _processOperationError(err) {
    console.log('Operation stream error: ' + JSON.stringify(err))
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
