
import React, { PureComponent, PropTypes } from 'react';
import { FlatList, View, Text } from 'react-native'
import { List, ListItem } from 'react-native-elements'

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

  _keyExtractor = (item, index) => item.info.id;

  _onPressItem = (id: string) => {
    this.props.onSelection(id)
    this.props.navigation.goBack()
  };

  _renderItem = ({item}) => {
    let accountSelected = (item.info.id == this.props.selectedAccount)
    let checkIcon = {
      name: 'check',
      color: 'green',
      type: 'MaterialIcons'
    }
    return (
      <ListItem
        key={item.info.id}
        title={item.info.name}
        subtitle={item.info.id}
        onPress={() => { this._onPressItem(item.info.id) }}
        hideChevron={!accountSelected}
        rightIcon={checkIcon}
      />
    )
  };

  render() {
    return (
      <List
        containerStyle={{flex: 1, marginTop: 0, borderTopWidth: 1, borderBottomWidth: 1, borderBottomColor: '#cbd2d9'}}>
        <FlatList
          data={this.props.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </List>
    );
  }
}

export default AccountList
