import { connect } from 'react-redux'
import HomeScreen from '../components/HomeScreen'

import { addAcccount } from '../actions'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const HomeScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)

export default HomeScreenContainer
