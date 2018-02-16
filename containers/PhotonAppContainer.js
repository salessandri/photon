import { connect } from 'react-redux'
import PhotonApp from '../components/PhotonApp'

import { addAcccount } from '../actions'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const PhotonAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotonApp)

export default PhotonAppContainer
