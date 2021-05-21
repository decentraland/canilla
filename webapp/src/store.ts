import { env } from 'decentraland-commons'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'
import createSagasMiddleware from 'redux-saga'
import { createStorageMiddleware } from 'decentraland-dapps/dist//modules/storage/middleware'
import { storageReducerWrapper } from 'decentraland-dapps/dist/modules/storage/reducer'

import { createTransactionMiddleware } from 'decentraland-dapps/dist//modules/transaction/middleware'
import { createRootReducer } from './reducer'
import { rootSaga } from './sagas'

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const history = require('history').createBrowserHistory()

const historyMiddleware = routerMiddleware(history)
const sagasMiddleware = createSagasMiddleware()

const { storageMiddleware, loadStorageMiddleware } = createStorageMiddleware({
  storageKey: 'decentraland-faucet',
})

const loggerMiddleware = createLogger({
  collapsed: () => true,
  predicate: (_: any, action) =>
    env.isDevelopment() || action.type.includes('Failure'),
})
const transactionMiddleware = createTransactionMiddleware()

const middleware = applyMiddleware(
  historyMiddleware,
  sagasMiddleware,
  loggerMiddleware,
  transactionMiddleware,
  storageMiddleware
)
const enhancer = composeEnhancers(middleware)
const rootReducer = storageReducerWrapper(createRootReducer(history))
const store = createStore(rootReducer, enhancer)

sagasMiddleware.run(rootSaga)
loadStorageMiddleware(store)

if (env.isDevelopment()) {
  const _window = window as any
  _window.getState = store.getState
}

export { history, store }
