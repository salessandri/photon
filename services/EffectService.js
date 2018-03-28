import StellarNetworkService from './StellarNetworkService';

class EffectService {

  constructor() {
    this._stellarNetworkService = StellarNetworkService
  }

  async getEffectsForOperation(operationId) {
    let rawEffects = await this._stellarNetworkService.getEffectsForOperation(operationId)
    return rawEffects.map(eff => {
      return this.parseEffect(eff)
    })
  }

  parseEffect(rawEffect) {

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

  _parseBasicEffect(rawEffect) {
    return {
      id: rawEffect.id,
      account: rawEffect.account,
      type: rawEffect.type
    }
  }
}

export default new EffectService()
