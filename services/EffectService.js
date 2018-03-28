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

  _parseBasicEffect(rawEffect) {
    return {
      id: rawEffect.id,
      account: rawEffect.account,
      type: rawEffect.type
    }
  }
}

export default new EffectService()
