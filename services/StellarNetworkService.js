import { Server } from 'stellar-sdk'

class StellarNetworkService {

  constructor() {
    this._server = new Server('https://horizon-testnet.stellar.org')
  }

  getServer() {
    return this._server;
  }

}

// The service is a singleton
export default new StellarNetworkService();
