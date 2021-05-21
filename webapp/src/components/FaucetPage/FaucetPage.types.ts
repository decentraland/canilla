import { Omit } from 'decentraland-dapps/dist//lib/types'
import {
  Wallet,
  NetworkData
} from 'decentraland-dapps/dist//modules/wallet/types'
import { refillManaRequest } from '../../modules/wallet/actions'

export type Props = {
  isConnecting: boolean
  isConnected: boolean
  isRefillIdle: boolean
  wallet: Wallet | null
  onRefillMana: typeof refillManaRequest
}

export type State = {
  address: Wallet['address']
  mana: NetworkData['mana']
}

export type MapStateProps = Omit<Props, 'onRefillMana'>
export type MapDispatchProps = Pick<Props, 'onRefillMana'>
