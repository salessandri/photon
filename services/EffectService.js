import StellarNetworkService from './StellarNetworkService'

class EffectService {

  constructor() {
    this._stellarNetworkService = StellarNetworkService
    this._parserByType = {
      account_created: (rawEffect) => {
        return this.parseAccountCreated(rawEffect)
      },
      account_removed: (rawEffect) => {
        return this.parseAccountRemoved(rawEffect)
      },
      account_credited: (rawEffect) => {
        return this.parseAccountCredited(rawEffect)
      },
      account_debited: (rawEffect) => {
        return this.parseAccountDebited(rawEffect)
      },
      account_thresholds_updated: (rawEffect) => {
        return this.parseAccountThresholdsUpdated(rawEffect)
      },
      account_home_domain_updated: (rawEffect) => {
        return this.parseAccountHomeDomainUpdated(rawEffect)
      },
      account_flags_updated: (rawEffect) => {
        return this.parseAccountFlagsUpdated(rawEffect)
      },
      account_inflation_destination_updated: (rawEffect) => {
        return this.parseAccountInflationDestinationUpdated(rawEffect)
      },
      signer_created: (rawEffect) => {
        return this.parseSignerCreated(rawEffect)
      },
      signer_removed: (rawEffect) => {
        return this.parseSignerRemoved(rawEffect)
      },
      signer_updated: (rawEffect) => {
        return this.parseSignerUpdated(rawEffect)
      },
      trustline_created: (rawEffect) => {
        return this.parseTrustlineCreated(rawEffect)
      },
      trustline_removed: (rawEffect) => {
        return this.parseTrustlineRemoved(rawEffect)
      },
      trustline_updated: (rawEffect) => {
        return this.parseTrustlineUpdated(rawEffect)
      },
      trustline_authorized: (rawEffect) => {
        return this.parseTrustlineAuthorized(rawEffect)
      },
      trustline_deauthorized: (rawEffect) => {
        return this.parseTrustlineDeauthorized(rawEffect)
      },
      trade: (rawEffect) => {
        return this.parseTrade(rawEffect)
      },
      data_created: (rawEffect) => {
        return this.parseDataCreated(rawEffect)
      },
      data_removed: (rawEffect) => {
        return this.parseDataRemoved(rawEffect)
      },
      data_updated: (rawEffect) => {
        return this.parseDataUpdated(rawEffect)
      },
    }
  }

  async getEffectsForOperation(operationId) {
    let rawEffects = await this._stellarNetworkService.getEffectsForOperation(operationId)
    return rawEffects.map(eff => {
      return this.parseEffect(eff)
    })
  }

  parseEffect(rawEffect) {
    if (!(rawEffect.type in this._parserByType)) {
      console.log.error('Found an unknown effect type: ' + rawEffect.type)
      return
    }
    return this._parserByType[rawEffect.type](rawEffect)
  }

  parseAccountCreated(rawEffect) {
    let basicEffect = this._parseBasicEffect(rawEffect)
    return {
      ...basicEffect,
      startingBalance: rawEffect.starting_balance
    }
  }

  parseAccountRemoved(rawEffect) {
    return this._parseBasicEffect(rawEffect)
  }

  parseAccountCredited(rawEffect) {
    let basicEffect = this._parseBasicEffect(rawEffect)
    return {
      ...basicEffect,
      assetType: rawEffect.asset_type,
      assetIssuer: rawEffect.asset_issuer,
      assetCode: rawEffect.asset_code,
      amount: rawEffect.amount
    }
  }

  parseAccountDebited(rawEffect) {
    let basicEffect = this._parseBasicEffect(rawEffect)
    return {
      ...basicEffect,
      assetType: rawEffect.asset_type,
      assetIssuer: rawEffect.asset_issuer,
      assetCode: rawEffect.asset_code,
      amount: rawEffect.amount
    }
  }

  parseAccountThresholdsUpdated(rawEffect) {
    let basicEffect = this._parseBasicEffect(rawEffect)
    return {
      ...basicEffect,
      lowThreshold: rawEffect.low_threshold,
      mediumThreshold: rawEffect.med_threshold,
      highThreshold: rawEffect.high_threshold
    }
  }

  parseAccountHomeDomainUpdated(rawEffect) {
    let basicEffect = this._parseBasicEffect(rawEffect)
    return {
      ...basicEffect,
      homeDomain: rawEffect.home_domain
    }
  }

  parseAccountFlagsUpdated(rawEffect) {
    let basicEffect = this._parseBasicEffect(rawEffect)
    return {
      ...basicEffect,
      authRequiredFlag: rawEffect.auth_required_flag,
      authRevocableFlag: rawEffect.auth_revocable_flag,
      authImmutableFlag: rawEffect.auth_immutable_flag
    }
  }

  parseAccountInflationDestinationUpdated(rawEffect) {
    return this._parseBasicEffect(rawEffect)
  }

  parseSignerCreated(rawEffect) {
    let basicEffect = this._parseBasicEffect(rawEffect)
    return {
      ...basicEffect,
      publicKey: rawEffect.public_key,
      key: rawEffect.key,
      weight: rawEffect.weight
    }
  }

  parseSignerRemoved(rawEffect) {
    let basicEffect = this._parseBasicEffect(rawEffect)
    return {
      ...basicEffect,
      publicKey: rawEffect.public_key,
      key: rawEffect.key,
      weight: rawEffect.weight
    }
  }

  parseSignerUpdated(rawEffect) {
    let basicEffect = this._parseBasicEffect(rawEffect)
    return {
      ...basicEffect,
      publicKey: rawEffect.public_key,
      key: rawEffect.key,
      weight: rawEffect.weight
    }
  }

  parseTrustlineCreated(rawEffect) {
    let basicEffect = this._parseBasicEffect(rawEffect)
    return {
      ...basicEffect,
      assetType: rawEffect.asset_type,
      assetIssuer: rawEffect.asset_issuer,
      assetCode: rawEffect.asset_code,
      limit: rawEffect.limit
    }
  }

  parseTrustlineRemoved(rawEffect) {
    let basicEffect = this._parseBasicEffect(rawEffect)
    return {
      ...basicEffect,
      assetType: rawEffect.asset_type,
      assetIssuer: rawEffect.asset_issuer,
      assetCode: rawEffect.asset_code,
      limit: rawEffect.limit
    }
  }

  parseTrustlineUpdated(rawEffect) {
    let basicEffect = this._parseBasicEffect(rawEffect)
    return {
      ...basicEffect,
      assetType: rawEffect.asset_type,
      assetIssuer: rawEffect.asset_issuer,
      assetCode: rawEffect.asset_code,
      limit: rawEffect.limit
    }
  }

  parseTrustlineAuthorized(rawEffect) {
    let basicEffect = this._parseBasicEffect(rawEffect)
    return {
      ...basicEffect,
      assetType: rawEffect.asset_type,
      assetCode: rawEffect.asset_code,
      trustor: rawEffect.trustor
    }
  }

  parseTrustlineDeauthorized(rawEffect) {
    let basicEffect = this._parseBasicEffect(rawEffect)
    return {
      ...basicEffect,
      assetType: rawEffect.asset_type,
      assetCode: rawEffect.asset_code,
      trustor: rawEffect.trustor
    }
  }

  parseTrade(rawEffect) {
    let basicEffect = this._parseBasicEffect(rawEffect)
    return {
      ...basicEffect,
      offerId: rawEffect.offer_id,
      seller: rawEffect.seller,
      soldAssetType: rawEffect.sold_asset_type,
      soldAssetIssuer: rawEffect.sold_asset_issuer,
      soldAssetCode: rawEffect.sold_asset_code,
      soldAmount: rawEffect.sold_amount,
      boughtAssetType: rawEffect.bought_asset_type,
      boughtAssetIssuer: rawEffect.bought_asset_issuer,
      boughtAssetCode: rawEffect.bought_asset_code,
      boughtAmount: rawEffect.bought_amount,
    }
  }

  parseDataCreated(rawEffect) {
    return this._parseBasicEffect(rawEffect)
  }

  parseDataRemoved(rawEffect) {
    return this._parseBasicEffect(rawEffect)
  }

  parseDataUpdated(rawEffect) {
    return this._parseBasicEffect(rawEffect)
  }

  _parseBasicEffect(rawEffect) {
    return {
      id: rawEffect.id,
      account: rawEffect.account,
      type: rawEffect.type
    }
  }
}

export default new EffectService()
