import React from 'react'
import { render } from 'react-dom'
import './index.css'
import './App.css'
import 'megadraft/dist/css/megadraft.css'
import 'font-awesome/css/font-awesome.min.css'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
import 'highlightjs/styles/github.css'
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
