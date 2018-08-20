import { getPendingTransactions } from '@dapps/modules/transaction/selectors'
import { RootState } from 'types'
import { REFILL_MANA_SUCCESS } from 'modules/wallet/actions'

export const isRefillIdle = (state: RootState, address: string = '') =>
  getPendingTransactions(state, address).filter(
    tx => tx.actionType === REFILL_MANA_SUCCESS
  )
