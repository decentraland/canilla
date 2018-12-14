import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import { RootState } from 'types'
import { transactionReducer as transaction } from '@dapps/modules/transaction/reducer'
import { translationReducer as translation } from '@dapps/modules/translation/reducer'
import { locationReducer as location } from '@dapps/modules/location/reducer'
import {
  storageReducer as storage,
  storageReducerWrapper
} from '@dapps/modules/storage/reducer'
import { walletReducer as wallet } from 'modules/wallet/reducer'

export const rootReducer = storageReducerWrapper(
  combineReducers<RootState>({
    transaction,
    translation,
    location,
    router,
    storage,
    wallet
  })
)
