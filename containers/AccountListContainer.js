import { connect } from 'react-redux'

import AccountList from '../components/AccountList'
import { selectAccount } from '../actions'

const mapStateToProps = state => {
  return {
    data: Object.values(state.accounts),
    selectedAccount: state.activeAccount.accountId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelection: (accountId) => {
      let selectAccountAction = selectAccount(accountId)
      dispatch(selectAccountAction)
    }
  }
}

const AccountListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountList)

export default AccountListContainer
