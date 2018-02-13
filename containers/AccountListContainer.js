import { connect } from 'react-redux'

import AccountList from '../components/AccountList'

const mapStateToProps = state => {
  return {
    data: Object.values(state.accounts)
  }
}

const AccountListContainer = connect(
  mapStateToProps
)(AccountList)

export default AccountListContainer
