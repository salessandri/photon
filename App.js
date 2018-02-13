import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import photonApp from './reducers'

import PhotonAppContainer from './containers/PhotonAppContainer';

let store = createStore(photonApp)

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <PhotonAppContainer />
      </Provider>
    )
  }
}
