import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

import AccountListContainer from '../containers/AccountListContainer'
import ActiveAccountBarContainer from '../containers/ActiveAccountBarContainer'

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'yellow', justifyContent: 'center',
          alignItems: 'center' }}>
          <Text>
          Test text box
          </Text>
        </View>
        <ActiveAccountBarContainer navigation={this.props.navigation} />
      </View>
    )
  }
}


export default HomeScreen
