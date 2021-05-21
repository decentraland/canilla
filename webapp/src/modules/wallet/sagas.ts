import { takeEvery, put, all, call, select } from 'redux-saga/effects'
import { Eth } from 'web3x-es/eth'
import { Address } from 'web3x-es/address'
import {
  getConnectedProvider
} from 'decentraland-dapps/dist//lib/eth'
import { createWalletSaga } from 'decentraland-dapps/dist//modules/wallet/sagas'
import { CONNECT_WALLET_SUCCESS } from 'decentraland-dapps/dist//modules/wallet/actions'
import { watchPendingTransactions } from 'decentraland-dapps/dist//modules/transaction/actions'
import { Provider } from 'decentraland-dapps/dist//modules/wallet/types'
import { ChainId } from '@dcl/schemas'

import {
  getAddress,
  getChainId,
} from 'decentraland-dapps/dist//modules/wallet/selectors'

import { ERC20 } from '../../contracts/ERC20'
import {
  REFILL_MANA_REQUEST,
  RefillManaRequestAction,
  refillManaSuccess,
  refillManaFailure
} from './actions'

const MANA_GOERLI = '0x3fcdd1e3f3a2ff3839c671bf00ae2b6cefd5e049'
const MANA_ROPSTEN = '0x4321f77dd1f7cac8e033131b5fbfbe23a2215747'

const baseWalletSaga = createWalletSaga({
  CHAIN_ID: window.location.href.includes('goerli') ? 5 : 3
})

export function* walletSaga() {
  yield all([baseWalletSaga(), walletBalanceSaga()])
}

function* walletBalanceSaga() {
  yield takeEvery(REFILL_MANA_REQUEST, handleRefillManaRequest)
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
}

function* handleRefillManaRequest(action: RefillManaRequestAction) {
  try {
    const { address, mana } = action.payload
    const provider: Provider = yield call(getConnectedProvider)
    if (!provider) {
      throw new Error(`Could not get connected provider`)
    }
    const eth = new Eth(provider)
    const chainId: ChainId = yield select(getChainId)
    const from: string = yield select(getAddress)

    const manaFiller = new ERC20(
      eth,
      Address.fromString(
        chainId === ChainId.ETHEREUM_GOERLI ? MANA_GOERLI : MANA_ROPSTEN)
    )

    const txHash: string = yield call(() =>
      manaFiller.methods.setBalance(Address.fromString(address), mana)
        .send({ from: Address.fromString(from) })
        .getTxHash()
    )

    yield put(refillManaSuccess(txHash, address, mana, chainId))
  } catch (error) {
    yield put(refillManaFailure(error.message))
  }
}

function* handleConnectWalletSuccess() {
  yield put(watchPendingTransactions())
}
