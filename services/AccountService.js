import { Connect } from 'redux-ddd';

import StellarNetworkService from './StellarNetworkService'

@Connect(state => ({
  activeAccount: state.activeAccount.accountId
}))
class AccountService {

  onStateUpdate(prev) {
    if (this.activeAccount && (prev.activeAccount !== this.activeAccount)) {
      this._stopUpdateStream();
      this._startUpdateStream(this.activeAccount);
    }
  }

  // The onAction listener is called every time an action is
  // dispatched in the Redux store. It can be helpful when we
  // have logic with side-effects.
  onAction(action) {
    return
  }

  _stopUpdateStream = () => {}

  _startUpdateStream(accountId) {
    this._stopUpdateStream = StellarNetworkService.getServer()
      .accounts()
      .accountId(accountId)
      .stream({
        onmessage: this._processUpdate,
        onerror: this._processError
      })
  }

  _processUpdate(accountInfo) {
    let summaryInfo = {
      accountId: accountInfo.account_id,
      sequence: accountInfo.sequence,
      balances: accountInfo.balances
    }

    console.log('Account summary info: ' + JSON.stringify(summaryInfo))
  }

  _processError(err) {
    console.log('Account update error: ' + JSON.stringify(err))
  }

}

export default new AccountService();
