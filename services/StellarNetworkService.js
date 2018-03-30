import { Server } from 'stellar-sdk'

class StellarNetworkService {

  constructor() {
    this._server = new Server('https://horizon-testnet.stellar.org')
  }

  getServer() {
    return this._server
  }

  async getEffectsForOperation(operationId) {
    let effectsPage = await this._server.effects().forOperation(operationId).call()
    return effectsPage.records
  }

  startOperationStreamForAccount(accountId, cursor, onOperation, onError) {
    return this._server.operations().forAccount(accountId).cursor(cursor).stream({
      onmessage: onOperation,
      onerror: onError
    })
  }

}

// The service is a singleton
export default new StellarNetworkService()
