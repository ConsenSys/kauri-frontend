// @flow

import React from 'react'
import { render } from 'react-dom'
import './index.css'
import './App.css'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Web3Provider } from 'react-web3'

import App from './App'

render(
  <Web3Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Web3Provider>,
  document.getElementById('root'),
)

registerServiceWorker()
