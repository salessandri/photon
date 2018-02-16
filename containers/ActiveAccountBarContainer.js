import { connect } from 'react-redux'
import ActiveAccountBar from '../components/ActiveAccountBar'

const mapStateToProps = state => {
  let activeAccountName = ((state.activeAccount.accountId !== null) ?
    state.accounts[state.activeAccount.accountId].name : 'No Account Selected')
  return {
    activeAccountName
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const ActiveAccountBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveAccountBar)

export default ActiveAccountBarContainer
