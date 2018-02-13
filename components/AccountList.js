
import React, { PureComponent, PropTypes } from 'react';
import { FlatList, View, Text } from 'react-native'

class AccountList extends React.PureComponent {

  static navigationOptions = ({ navigation }) => {
    let addButton = (
      <Text style={{ marginRight: 10 }} onPress={() => navigation.navigate('AccountAdd')}>
        Add
      </Text>
    )
    return {
      title: 'Accounts',
      headerRight: addButton
    }
  };

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    console.log('Item {id} pressed')
  };

  _renderItem = ({item}) => (
    <Text>
      {item.name} - {item.id}
    </Text>
  );

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'blue' }}>
        <FlatList
          data={this.props.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

export default AccountList
