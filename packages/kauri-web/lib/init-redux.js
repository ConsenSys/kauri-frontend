import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import fetch from 'isomorphic-unfetch'
import Web3 from 'web3'
import web3PersonalSign, { personalSign } from './web3-personal-sign'
import getGasPrice from './web3-get-gas-price'
import { rootReducer, rootEpic } from './root'
import apolloSubscriber from './apollo-subscriber'

let reduxStore = null

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = f => f
if (global.window && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__()
}

function create (apollo, initialState = {}, context = {}) {
  let Driver
  if (global.window) {
    Driver = require('driver.js')
  }
  const dependencies = {
    web3: (global.window && window.web3) || new Web3(),
    smartContracts: () => (global.window ? window.smartContracts : {}),
    apolloClient: apollo,
    fetch,
    apolloSubscriber,
    web3PersonalSign,
    personalSign,
    getGasPrice,
    driverJS: global.window ? new Driver({ showButtons: true }) : {},
  }

  const combinedReducers = combineReducers({
    ...rootReducer,
  })

  return createStore(
    combinedReducers,
    initialState, // Hydrate the store with server-side data
    compose(
      applyMiddleware(createEpicMiddleware(rootEpic, { dependencies })), // Add additional middleware here
      devtools
    )
  )
}

const mergeLocalStorageState = initialState => {
  try {
    const serializedState = window.localStorage.getItem('redux')
    if (serializedState === null) {
      return initialState
    }
    return Object.assign(initialState, JSON.parse(serializedState))
  } catch (err) {
    return initialState
  }
}

export default function initRedux (apollo, initialState, nextContext) {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!global.window) {
    return create(apollo, initialState, nextContext)
  }

  // Reuse store on the client-side
  if (!reduxStore) {
    reduxStore = create(apollo, mergeLocalStorageState(initialState), nextContext)
  }
  return reduxStore
}
