import { Connect } from 'redux-ddd'

import {
  addTransaction,
  addOperation
} from '../actions'

import EffectService from './EffectService'
import OperationService from './OperationService'
import StellarNetworkService from './StellarNetworkService'

@Connect(state => ({
  accounts: state.accounts,
}))
class AccountService {

  constructor() {
    this._stellarNetworkService = StellarNetworkService
    this._operationService = OperationService
    this._effectService = EffectService
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

  onStateUpdate(prev) {
    Object.keys(this.accounts).forEach(accountId => {
      if (!(accountId in prev.accounts)) {
        return
      }
      if (this._operationsQueueByAccount[accountId].length === 0) {
        return
      }
      let headOperation = this._operationsQueueByAccount[accountId][0]
      let txInPrev =
        (headOperation.transactionId in prev.accounts[accountId].transactions.transactionsById)
      if (txInPrev) {
        return
      }
      let txInCurrent =
        (headOperation.transactionId in this.accounts[accountId].transactions.transactionsById)
      if (txInCurrent) {
        this._processAccountOperationQueueHead(accountId)
      }
    })
  }

  _stopUpdateStream(accountId) {
    let {operationStream, transactionsStream} = this._updateStreams[accountId]
    operationStream()
    transactionsStream()
    delete this._updateStreams[accountId]
    delete this._operationsQueueByAccount[accountId]
  }

  _startUpdateStream(accountId, operationsCursor, txCursor) {
    this._operationsQueueByAccount[accountId] = []
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
        onerror: _ => { /* Ignore errors for now */ }
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
    this._operationsQueueByAccount[accountId].push(operation)
    if (this._operationsQueueByAccount[accountId].length > 1) {
      return
    }
    this._processAccountOperationQueueHead(accountId)
  }

  _processAccountOperationQueueHead(accountId) {
    let operation = this._operationsQueueByAccount[accountId][0]
    if (!(operation.transactionId in this.accounts[accountId].transactions.transactionsById)) {
      return
    }
    this._effectService.getEffectsForOperation(operation.id)
      .then(effects => {
        let addOperationAction = addOperation(accountId, operation, effects)
        this.dispatch(addOperationAction)
        this._operationsQueueByAccount[accountId].shift()
        if (this._operationsQueueByAccount[accountId].length > 0) {
          this._processAccountOperationQueueHead(accountId)
        }
      })
      .catch(err => {
        console.debug('Error trying to get the effects for operation: ' + err)
        this._processAccountOperationQueueHead(accountId)
      })
  }

  _updateStreams = {}
  _operationsQueueByAccount = {}
}

export default new AccountService()
