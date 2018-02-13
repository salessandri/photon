import { connect } from 'react-redux'

import { addAcccount } from '../actions'
import AccountAdd from '../components/AccountAdd'

const mapStateToProps = state => {
  return {
    existingAccounts: Object.values(state.accounts)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: ({ id, name, privateKey }) => {
      let addAccountAction = addAcccount(id, name, privateKey)
      dispatch(addAccountAction)
    }
  }
}

const AccountAddContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountAdd)

export default AccountAddContainer
