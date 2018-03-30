import StellarNetworkService from "./StellarNetworkService"

class OperationService {
  constructor() {
    this._stellarNetworkService = StellarNetworkService
    this._parsers = {
      create_account: rawOperation => {
        return this.parseCreateAccount(rawOperation)
      },
      payment: rawOperation => {
        return this.parsePayment(rawOperation)
      },
      path_payment: rawOperation => {
        return this.parsePathPayment(rawOperation)
      },
      manage_offer: rawOperation => {
        return this.parseManageOffer(rawOperation)
      },
      create_passive_offer: rawOperation => {
        return this.parseCreatePassiveOffer(rawOperation)
      },
      set_options: rawOperation => {
        return this.parseSetOptions(rawOperation)
      },
      change_trust: rawOperation => {
        return this.parseChangeTrust(rawOperation)
      },
      allow_trust: rawOperation => {
        return this.parseAllowTrust(rawOperation)
      },
      account_merge: rawOperation => {
        return this.parseAccountMerge(rawOperation)
      },
      inflation: rawOperation => {
        return this.parseInflation(rawOperation)
      },
      manage_data: rawOperation => {
        return this.parseManageData(rawOperation)
      }
    }
  }

  startOperationStreamForAccount(accountId, cursor, onOperation, onError) {
    return this._stellarNetworkService.startOperationStreamForAccount(
      accountId,
      cursor,
      (op) => {
        try {
          let parsedOp = this.parseOperation(op)
          onOperation(parsedOp)
        }
        catch (err) {
          onError(err)
        }
      },
      onError
    )
  }

  parseOperation(rawOperation) {
    if (!(rawOperation.type in this._parsers)) {
      console.log.error("Found an unknown operation type: " + rawOperation.type)
      throw 'Unknown operation type'
    }
    return this._parsers[rawOperation.type](rawOperation)
  }

  parseCreateAccount(operation) {
    let basicOp = this._buildBasicOperation(operation)
    return {
      ...basicOp,
      startingBalance: operation.starting_balance,
      funder: operation.funder,
      account: operation.account
    }
  }

  parsePayment(operation) {
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

  parsePathPayment(operation) {
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

  parseManageOffer(operation) {
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

  parseCreatePassiveOffer(operation) {
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

  parseSetOptions(operation) {
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

  parseChangeTrust(operation) {
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

  parseAllowTrust(operation) {
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

  parseAccountMerge(operation) {
    let basicOp = this._buildBasicOperation(operation)
    return {
      ...basicOp,
      account: operation.account,
      into: operation.into
    }
  }

  parseInflation(operation) {
    return this._buildBasicOperation(operation)
  }

  parseManageData(operation) {
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

export default new OperationService()
