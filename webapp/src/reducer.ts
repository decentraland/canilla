import { History } from 'history'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { transactionReducer as transaction } from 'decentraland-dapps/dist//modules/transaction/reducer'
import { translationReducer as translation } from 'decentraland-dapps/dist//modules/translation/reducer'
import { storageReducer as storage } from 'decentraland-dapps/dist//modules/storage/reducer'
import { walletReducer as wallet } from 'decentraland-dapps/dist/modules/wallet/reducer'

export const createRootReducer = (history: History) =>
  combineReducers({
    transaction,
    translation,
    router: connectRouter(history),
    storage,
    wallet
  })

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>
