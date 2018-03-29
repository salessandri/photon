
class OperationService {

  constructor() {
    this._parsers = {
      create_account: (accountId, rawOperation) => {
        return this.parseCreateAccount(accountId, rawOperation)
      },
      payment: (accountId, rawOperation) => {
        return this.parsePayment(accountId, rawOperation)
      },
      path_payment: (accountId, rawOperation) => {
        return this.parsePathPayment(accountId, rawOperation)
      },
      manage_offer: (accountId, rawOperation) => {
        return this.parseManageOffer(accountId, rawOperation)
      },
      create_passive_offer: (accountId, rawOperation) => {
        return this.parseCreatePassiveOffer(accountId, rawOperation)
      },
      set_options: (accountId, rawOperation) => {
        return this.parseSetOptions(accountId, rawOperation)
      },
      change_trust: (accountId, rawOperation) => {
        return this.parseChangeTrust(accountId, rawOperation)
      },
      allow_trust: (accountId, rawOperation) => {
        return this.parseAllowTrust(accountId, rawOperation)
      },
      account_merge: (accountId, rawOperation) => {
        return this.parseAccountMerge(accountId, rawOperation)
      },
      inflation: (accountId, rawOperation) => {
        return this.parseInflation(accountId, rawOperation)
      },
      manage_data: (accountId, rawOperation) => {
        return this.parseManageData(accountId, rawOperation)
      }
    }
  }

  parseOperation(accountId, rawOperation) {
    if (!(rawOperation.type in this._parsers)) {
      log.error('Found an unknown operation type: ' + rawOperation.type)
      return
    }
    return this._parsers[rawOperation.type](accountId, rawOperation)
  }

  parseCreateAccount(accountId, operation) {
    let basicOp = this._buildBasicOperation(operation)
    return {
      ...basicOp,
      startingBalance: operation.starting_balance,
      funder: operation.funder,
      account: operation.account
    }
  }

  parsePayment(accountId, operation) {
    let basicOp = this._buildBasicOperation(operation)
    return {
      ...basicOp,
      assetType: operation.asset_type,
      assetCode: operation.asset_code,
      assetIssuer: operation.asset_issuer,
      from: operation.from,
      to: operation.to,
      amount: operation.amount
    }
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
    return {
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
  }

  parseManageOffer(accountId, operation) {
    let basicOp = this._buildBasicOperation(operation)
    return {
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
  }

  parseCreatePassiveOffer(accountId, operation) {
    let basicOp = this._buildBasicOperation(operation)
    return {
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
  }

  parseSetOptions(accountId, operation) {
    let basicOp = this._buildBasicOperation(operation)
    return {
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
  }

  parseChangeTrust(accountId, operation) {
    let basicOp = this._buildBasicOperation(operation)
    return {
      ...basicOp,
      assetType: operation.asset_type,
      assetIssuer: operation.asset_issuer,
      assetCode: operation.asset_code,
      trustee: operation.trustee,
      trustor: operation.trustor,
      limit: operation.limit
    }
  }

  parseAllowTrust(accountId, operation) {
    let basicOp = this._buildBasicOperation(operation)
    return {
      ...basicOp,
      assetType: operation.asset_type,
      assetIssuer: operation.asset_issuer,
      assetCode: operation.asset_code,
      trustee: operation.trustee,
      trustor: operation.trustor,
      authorize: operation.authorize
    }
  }

  parseAccountMerge(accountId, operation) {
    let basicOp = this._buildBasicOperation(operation)
    return {
      ...basicOp,
      account: operation.account,
      into: operation.into
    }
  }

  parseInflation(accountId, operation) {
    return this._buildBasicOperation(operation)
  }

  parseManageData(accountId, operation) {
    let basicOp = this._buildBasicOperation(operation)
    return {
      ...basicOp,
      name: operation.name,
      value: operation.value
    }
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
