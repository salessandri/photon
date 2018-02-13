import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

import { StackNavigator } from "react-navigation";

import HomeScreenContainer from '../containers/HomeScreenContainer'
import AccountListContainer from '../containers/AccountListContainer'
import AccountAddContainer from '../containers/AccountAddContainer'

const PhotonApp = StackNavigator({
  Home: {
    screen: HomeScreenContainer
  },
  Accounts: {
    screen: AccountListContainer
  },
  AccountAdd: {
    screen: AccountAddContainer
  }
});

export default PhotonApp
