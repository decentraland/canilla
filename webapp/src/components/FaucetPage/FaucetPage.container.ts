import { connect } from 'react-redux'
import { RootDispatch } from 'decentraland-dapps/dist//types'
import { RootState } from '../../reducer'
import {
  getData,
  isConnecting,
  isConnected,
} from 'decentraland-dapps/dist//modules/wallet/selectors'
import { isRefillIdle } from '../../modules/wallet/selectors'
import { refillManaRequest } from '../../modules/wallet/actions'
import { MapStateProps, MapDispatchProps } from './FaucetPage.types'

import FaucetPage from './FaucetPage'

const mapState = (state: RootState): MapStateProps => {
  const isWalletConnected = isConnected(state)
  const wallet = getData(state)

  return {
    isConnecting: isConnecting(state),
    isConnected: isWalletConnected,
    isRefillIdle: !!wallet && isRefillIdle(state, wallet.address).length > 0,
    wallet: getData(state),
  }
}

const mapDispatch = (dispatch: RootDispatch): MapDispatchProps => ({
  onRefillMana: (address: string, mana: string) =>
    dispatch(refillManaRequest(address, mana)),
})

export default connect(mapState, mapDispatch)(FaucetPage)
