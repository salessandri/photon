import { Connect } from 'redux-ddd'

import {
  addTransaction,
  addOperation
} from '../actions'

import OperationService from './OperationService'
import StellarNetworkService from './StellarNetworkService'

@Connect()
class AccountService {

  constructor() {
    this._stellarNetworkService = StellarNetworkService
    this._operationService = OperationService
  }

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
    let {operationStream, transactionsStream} = this._updateStreams[accountId]
    operationStream()
    transactionsStream()
    delete this._updateStreams[accountId]
  }

  _startUpdateStream(accountId, operationsCursor, txCursor) {
    let operationsStream = this._operationService.startOperationStreamForAccount(
      accountId,
      operationsCursor,
      op => { this._processOperation(accountId, op) },
      () => {}
    )
    let transactionsStream = this._stellarNetworkService.getServer()
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
    let addOperationAction = addOperation(accountId, operation)
    this.dispatch(addOperationAction)
  }

  _updateStreams = {}

}

export default new AccountService()
