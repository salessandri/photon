import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'

// Logger with default options
import logger from 'redux-logger'

import photonApp from './reducers'

import PhotonAppContainer from './containers/PhotonAppContainer';

let store = createStore(
  photonApp,
  applyMiddleware(logger)
)

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <PhotonAppContainer />
      </Provider>
    )
  }
}
