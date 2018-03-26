import { Connect } from 'redux-ddd';

import StellarNetworkService from './StellarNetworkService'

import {
  addTransaction,
  addCreateAccountOperation,
  addAccountMergeOperation,
  addPaymentOperation,
  addPathPaymentOperation,
  addManageOfferOperation,
  addCreatePassiveOfferOperation,
  addSetOptionsOperation,
  addChangeTrustOperation
} from '../actions'

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
      case 'payment':
        this._processPayment(accountId, operation)
        return
      case 'path_payment':
        this._processPathPayment(accountId, operation)
        return
      case 'manage_offer':
        this._processManageOffer(accountId, operation)
        return
      case 'create_passive_offer':
        this._processCreatePassiveOffer(accountId, operation)
        return
      case 'set_options':
        this._processSetOptions(accountId, operation)
        return
      case 'change_trust':
        this._processChangeTrust(accountId, operation)
        return
      case 'account_merge':
        this._processAccountMerge(accountId, operation)
        return
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

  _processPayment(accountId, operation) {
    let modelOp = {
      id: operation.id,
      sourceAccount: operation.source_account,
      type: operation.type,
      createdAt: operation.created_at,
      transactionId: operation.transaction_hash,
      assetType: operation.asset_type,
      assetCode: operation.asset_code,
      assetIssuer: operation.asset_issuer,
      from: operation.from,
      to: operation.to,
      amount: operation.amount
    }
    let action = addPaymentOperation(accountId, modelOp)
    this.dispatch(action)
  }

  _processPathPayment(accountId, operation) {
    let modelOp = {
      id: operation.id,
      sourceAccount: operation.source_account,
      type: operation.type,
      createdAt: operation.created_at,
      transactionId: operation.transaction_hash,
      from: operation.from,
      to: operation.to,
      sourceAssetType: operation.source_asset_type,
      sourceAssetIssuer: operation.source_asset_issuer,
      sourceAssetCode: operation.source_asset_code,
      sourceMaxAmount: operation.source_max,
      sourceAmount: operation.source_amount,
      destinationAssetType: operation.asset_type,
      destinationAssetIssuer: operation.asset_issuer,
      destinationAssetCode: operation.asset_code,
      destinationAmount: operation.amount
    }
    let action = addPathPaymentOperation(accountId, modelOp)
    this.dispatch(action)
  }

  _processManageOffer(accountId, operation) {
    let modelOp = {
      id: operation.id,
      sourceAccount: operation.source_account,
      type: operation.type,
      createdAt: operation.created_at,
      transactionId: operation.transaction_hash,
      offerId: operation.offer_id,
      amount: operation.amount,
      buyingAssetType: operation.buying_asset_type,
      buyingAssetIssuer: operation.buying_asset_issuer,
      buyingAssetCode: operation.buying_asset_code,
      price: operation.price,
      priceRatio: operation.price_r,
      sellingAssetType: operation.selling_asset_type,
      sellingAssetIssuer: operation.selling_asset_issuer,
      sellingAssetCode: operation.selling_asset_code
    }
    let action = addManageOfferOperation(accountId, modelOp)
    this.dispatch(action)
  }

  _processCreatePassiveOffer(accountId, operation) {
    let modelOp = {
      id: operation.id,
      sourceAccount: operation.source_account,
      type: operation.type,
      createdAt: operation.created_at,
      transactionId: operation.transaction_hash,
      offerId: operation.offer_id,
      amount: operation.amount,
      buyingAssetType: operation.buying_asset_type,
      buyingAssetIssuer: operation.buying_asset_issuer,
      buyingAssetCode: operation.buying_asset_code,
      price: operation.price,
      priceRatio: operation.price_r,
      sellingAssetType: operation.selling_asset_type,
      sellingAssetIssuer: operation.selling_asset_issuer,
      sellingAssetCode: operation.selling_asset_code
    }
    let action = addCreatePassiveOfferOperation(accountId, modelOp)
    this.dispatch(action)
  }

  _processSetOptions(accountId, operation) {
    let modelOp = {
      id: operation.id,
      sourceAccount: operation.source_account,
      type: operation.type,
      createdAt: operation.created_at,
      transactionId: operation.transaction_hash,
      signerKey: operation.signer_key,
      signerWeight: operation.signer_weight,
      masterKeyWeight: operation.master_key_weight,
      lowThreshold: operation.low_threshold,
      mediumThreshold: operation.med_threshold,
      highThreshold: operation.high_threshold,
      homeDomain: operation.home_domain,
      flagsSet: operation.set_flags_s,
      flagsCleared: operation.clear_flags_s
    }
    let action = addSetOptionsOperation(accountId, modelOp)
    this.dispatch(action)
  }

  _processChangeTrust(accountId, operation) {
    let modelOp = {
      id: operation.id,
      sourceAccount: operation.source_account,
      type: operation.type,
      createdAt: operation.created_at,
      transactionId: operation.transaction_hash,
      assetType: operation.asset_type,
      assetIssuer: operation.asset_issuer,
      assetCode: operation.asset_code,
      trustee: operation.trustee,
      trustor: operation.trustor,
      limit: operation.limit
    }
    let action = addChangeTrustOperation(accountId, operation)
    this.dispatch(action)
  }

  _processAccountMerge(accountId, operation) {
    let modelOp = {
      id: operation.id,
      sourceAccount: operation.source_account,
      type: operation.type,
      createdAt: operation.created_at,
      transactionId: operation.transaction_hash,
      into: operation.into,
      account: operation.account
    }
    let action = addAccountMergeOperation(accountId, modelOp)
    this.dispatch(action)
  }

  _updateStreams = {}

}

export default new AccountService();
