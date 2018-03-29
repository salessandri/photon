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
  addManageDataOperation,
  addInflationOperation
} from '../actions'

class OperationService {

  constructor() {
    this._parsers = {
      create_account: (accountId, rawOperation) => {
        this.parseCreateAccount(accountId, rawOperation)
      },
      payment: (accountId, rawOperation) => {
        this.parsePayment(accountId, rawOperation)
      },
      path_payment: (accountId, rawOperation) => {
        this.parsePathPayment(accountId, rawOperation)
      },
      manage_offer: (accountId, rawOperation) => {
        this.parseManageOffer(accountId, rawOperation)
      },
      create_passive_offer: (accountId, rawOperation) => {
        this.parseCreatePassiveOffer(accountId, rawOperation)
      },
      set_options: (accountId, rawOperation) => {
        this.parseSetOptions(accountId, rawOperation)
      },
      change_trust: (accountId, rawOperation) => {
        this.parseChangeTrust(accountId, rawOperation)
      },
      allow_trust: (accountId, rawOperation) => {
        this.parseAllowTrust(accountId, rawOperation)
      },
      account_merge: (accountId, rawOperation) => {
        this.parseAccountMerge(accountId, rawOperation)
      },
      inflation: (accountId, rawOperation) => {
        this.parseInflation(accountId, rawOperation)
      },
      manage_data: (accountId, rawOperation) => {
        this.parseManageData(accountId, rawOperation)
      }
    }
  }

  parseOperation(accountId, rawOperation) {
    if (!(rawOperation.type in this._parsers)) {
      log.error('Found an unknown operation type: ' + rawOperation.type)
      return
    }
    this._parsers[rawOperation.type](accountId, rawOperation)
  }

  parseCreateAccount(accountId, operation) {
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

  parsePayment(accountId, operation) {
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

  parsePathPayment(accountId, operation) {
    let basicOp = this._buildBasicOperation(operation)
    let path = operation.path.map(p => {
      return {
        assetType: p.asset_type,
        assetIssuer: p.asset_issuer,
        assetCode: p.asset_code
      }
    })
    let modelOp = {
      ...basicOp,
      from: operation.from,
      to: operation.to,
      sourceAssetType: operation.source_asset_type,
      sourceAssetIssuer: operation.source_asset_issuer,
      sourceAssetCode: operation.source_asset_code,
      sourceMaxAmount: operation.source_max,
      destinationAssetType: operation.asset_type,
      destinationAssetIssuer: operation.asset_issuer,
      destinationAssetCode: operation.asset_code,
      destinationAmount: operation.amount,
      path: path
    }
    let action = addPathPaymentOperation(accountId, modelOp)
    this.dispatch(action)
  }

  parseManageOffer(accountId, operation) {
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

  parseCreatePassiveOffer(accountId, operation) {
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

  parseSetOptions(accountId, operation) {
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

  parseChangeTrust(accountId, operation) {
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

  parseAllowTrust(accountId, operation) {
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

  parseAccountMerge(accountId, operation) {
    let basicOp = this._buildBasicOperation(operation)
    let modelOp = {
      ...basicOp,
      account: operation.account,
      into: operation.into
    }
    let action = addAccountMergeOperation(accountId, modelOp)
    this.dispatch(action)
  }

  parseInflation(accountId, operation) {
    let basicOp = this._buildBasicOperation(operation)
    let action = addInflationOperation(accountId, basicOp)
    this.dispatch(action)
  }

  parseManageData(accountId, operation) {
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

export default new OperationService();
