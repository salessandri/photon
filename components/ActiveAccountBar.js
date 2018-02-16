import React, { PureComponent, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

class ActiveAccountBar extends React.PureComponent {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.activeAccountLabel}>
          {this.props.activeAccountName}
        </Text>
        <Icon
          name='chevron-up'
          type='octicon'
          onPress={() => navigate('Accounts')}
          containerStyle={styles.accountSelectButton} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    height: 50,
    alignItems: 'center'
  },
  activeAccountLabel: {
    flex: 1,
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  accountSelectButton: {
    marginRight: 10,
    paddingLeft: 20,
    borderLeftColor: 'black',
    borderLeftWidth: 1,
  },
});

export default ActiveAccountBar
