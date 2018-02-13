import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

import AccountListContainer from '../containers/AccountListContainer'

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
        <Text style={{ height: 20 }} onPress={() => { navigate('Accounts') }}>
          Add Random Account
        </Text>
      </View>
    )
  }
}


export default HomeScreen
