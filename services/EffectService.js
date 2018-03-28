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
}
