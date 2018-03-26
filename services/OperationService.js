import { Connect } from 'redux-ddd';

import {
  addCreateAccountOperation,
  addAccountMergeOperation,
  addPaymentOperation,
  addPathPaymentOperation,
  addManageOfferOperation,
  addCreatePassiveOfferOperation,
  addSetOptionsOperation,
  addChangeTrustOperation,
  addAllowTrustOperation,
  addManageDataOperation
} from '../actions'

@Connect()
class OperationService {

  constructor() {
    this._processors = {
      create_account: (accountId, rawOperation) => {
        this.processCreateAccount(accountId, rawOperation)
      },
      payment: (accountId, rawOperation) => {
        this.processPayment(accountId, rawOperation)
      },
      path_payment: (accountId, rawOperation) => {
        this.processPathPayment(accountId, rawOperation)
      },
      manage_offer: (accountId, rawOperation) => {
        this.processManageOffer(accountId, rawOperation)
      },
      create_passive_offer: (accountId, rawOperation) => {
        this.processCreatePassiveOffer(accountId, rawOperation)
      },
      set_options: (accountId, rawOperation) => {
        this.processSetOptions(accountId, rawOperation)
      },
      change_trust: (accountId, rawOperation) => {
        this.processChangeTrust(accountId, rawOperation)
      },
      allow_trust: (accountId, rawOperation) => {
        this.processAllowTrust(accountId, rawOperation)
      },
      account_merge: (accountId, rawOperation) => {
        this.processAccountMerge(accountId, rawOperation)
      },
      inflation: (accountId, rawOperation) => {
        this.processInflation(accountId, rawOperation)
      },
      manage_data: (accountId, rawOperation) => {
        this.processManageData(accountId, rawOperation)
      }
    }
  }

  processOperation(accountId, rawOperation) {
    if (!(rawOperation.type in this._processors)) {
      log.error('Found an unknown operation type: ' + rawOperation.type)
      return
    }
    this._processors[rawOperation.type](accountId, rawOperation)
  }

  processCreateAccount(accountId, operation) {
    let basicOp = this._buildBasicOperation(operation)
    let modelOp = {
      ...basicOp,
      startingBalance: operation.starting_balance,
      funder: operation.funder,
      account: operation.account
    }
    let action = addCreateAccountOperation(accountId, modelOp)
    this.dispatch(action)
  }

  processPayment(accountId, operation) {
    let basicOp = this._buildBasicOperation(operation)
    let modelOp = {
      ...basicOp,
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
    let basicOp = this._buildBasicOperation(operation)
    let modelOp = {
      ...basicOp,
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
    let basicOp = this._buildBasicOperation(operation)
    let modelOp = {
      ...basicOp,
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
    let basicOp = this._buildBasicOperation(operation)
    let modelOp = {
      ...basicOp,
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
    let basicOp = this._buildBasicOperation(operation)
    let modelOp = {
      ...basicOp,
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
    let basicOp = this._buildBasicOperation(operation)
    let modelOp = {
      ...basicOp,
      assetType: operation.asset_type,
      assetIssuer: operation.asset_issuer,
      assetCode: operation.asset_code,
      trustee: operation.trustee,
      trustor: operation.trustor,
      limit: operation.limit
    }
    let action = addChangeTrustOperation(accountId, modelOp)
    this.dispatch(action)
  }

  _processAllowTrust(accountId, operation) {
    let basicOp = this._buildBasicOperation(operation)
    let modelOp = {
      ...basicOp,
      assetType: operation.asset_type,
      assetIssuer: operation.asset_issuer,
      assetCode: operation.asset_code,
      trustee: operation.trustee,
      trustor: operation.trustor,
      authorize: operation.authorize
    }
    let action = addAllowTrustOperation(accountId, modelOp)
    this.dispatch(action)
  }

  _processAccountMerge(accountId, operation) {
    let basicOp = this._buildBasicOperation(operation)
    let modelOp = {
      ...basicOp,
      account: operation.account,
      into: operation.into
    }
    let action = addAccountMergeOperation(accountId, modelOp)
    this.dispatch(action)
  }

  _processInflation(accountId, operation) {
    let basicOp = this._buildBasicOperation(operation)
    let action = addInflationOperation(accountId, basicOp)
    this.dispatch(action)
  }

  _processManageData(accountId, operation) {
    let basicOp = this._buildBasicOperation(operation)
    let modelOp = {
      ...basicOp,
      name: operation.name,
      value: operation.value
    }
    let action = addManageDataOperation(accountId, modelOp)
    this.dispatch(action)
  }

  _buildBasicOperation(operation) {
    return {
      id: operation.id,
      sourceAccount: operation.source_account,
      type: operation.type,
      createdAt: operation.created_at,
      transactionId: operation.transaction_hash
    }
  }
}
