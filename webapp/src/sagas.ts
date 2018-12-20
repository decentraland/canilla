import { all } from 'redux-saga/effects'

import { locationSaga } from '@dapps/modules/location/sagas'
import { transactionSaga } from '@dapps/modules/transaction/sagas'
import { createTranslationSaga } from '@dapps/modules/translation/sagas'
import { walletSaga } from 'modules/wallet/sagas'
import * as translations from 'translations'

export const translationSaga = createTranslationSaga({
  translations
})

export function* rootSaga() {
  yield all([
    locationSaga(),
    transactionSaga(),
    translationSaga(),
    walletSaga()
  ])
}
