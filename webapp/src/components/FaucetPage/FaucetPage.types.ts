import { Omit } from '@dapps/lib/types'
import { BaseWallet } from '@dapps/modules/wallet/types'
import { connectWalletRequest } from '@dapps/modules/wallet/actions'
import { refillManaRequest } from 'modules/wallet/actions'

export type Props = {
  isConnecting: boolean
  isConnected: boolean
  wallet: Partial<BaseWallet>
  onRefillMana: typeof refillManaRequest
  onConnectWallet: typeof connectWalletRequest
}

export type State = {
  address: BaseWallet['address']
  mana: BaseWallet['mana']
}

export type MapStateProps = Omit<Props, 'onRefillMana' | 'onConnectWallet'>
export type MapDispatchProps = Pick<Props, 'onRefillMana' | 'onConnectWallet'>
