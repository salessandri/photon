import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'

// Logger with default options
import logger from 'redux-logger'

import { bindStore, actionListenerMiddleware } from 'redux-ddd';

import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import photonApp from './reducers'

import PhotonAppContainer from './containers/PhotonAppContainer';

import AccountService from './services/AccountService'
import OperationService from './services/OperationService'

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
}

const persistedReducer = persistReducer(persistConfig, photonApp)

let store = createStore(
  persistedReducer,
  applyMiddleware(
    actionListenerMiddleware,
    logger
  )
)

bindStore(store, [
  AccountService,
  OperationService
])

let persistor = persistStore(store)

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PhotonAppContainer />
        </PersistGate>
      </Provider>
    )
  }
}
