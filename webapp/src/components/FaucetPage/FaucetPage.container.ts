import { connect } from 'react-redux'
import { RootDispatch } from '@dapps/types'
import { RootState } from 'types'
import {
  getData,
  isConnecting,
  isConnected
} from '@dapps/modules/wallet/selectors'
import { connectWalletRequest } from '@dapps/modules/wallet/actions'
import { isRefillIdle } from 'modules/wallet/selectors'
import { refillManaRequest } from 'modules/wallet/actions'
import {
  MapStateProps,
  MapDispatchProps
} from 'components/FaucetPage/FaucetPage.types'

import FaucetPage from './FaucetPage'

const mapState = (state: RootState): MapStateProps => {
  const isWalletConnected = isConnected(state)
  const wallet = getData(state)

  return {
    isConnecting: isConnecting(state),
    isConnected: isWalletConnected,
    isRefillIdle: isRefillIdle(state, wallet.address).length > 0,
    wallet: getData(state)
  }
}

const mapDispatch = (dispatch: RootDispatch): MapDispatchProps => ({
  onRefillMana: (address: string, mana: number) =>
    dispatch(refillManaRequest(address, mana)),
  onConnectWallet: () => dispatch(connectWalletRequest())
})

export default connect(
  mapState,
  mapDispatch
)(FaucetPage)
