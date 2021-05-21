import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import TranslationProvider from 'decentraland-dapps/dist//providers/TranslationProvider'
import WalletProvider from 'decentraland-dapps/dist//providers/WalletProvider'

import { Routes } from './components/Routes'
import { store, history } from './store'
import * as locales from './translations'

import 'decentraland-ui/lib/styles.css'
import 'decentraland-ui/lib/dark-theme.css'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <TranslationProvider locales={Object.keys(locales)}>
      <WalletProvider>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </WalletProvider>
    </TranslationProvider>
  </Provider>,
  document.getElementById('root')
)
