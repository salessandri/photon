import { connect } from 'react-redux'
import PhotonApp from '../components/PhotonApp'

import { addAcccount } from '../actions'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onPress: () => {
      let addAcountAction = addAcccount(
        'id=' + Math.random().toString(36).substring(7),
        'name=' + Math.random().toString(36).substring(7),
        'pk=' + Math.random().toString(36).substring(7)
      )
      dispatch(addAcountAction)
    }
  }
}

const PhotonAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotonApp)

export default PhotonAppContainer
