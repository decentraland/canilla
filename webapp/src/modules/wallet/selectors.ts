import { getPendingTransactions } from 'decentraland-dapps/dist//modules/transaction/selectors'
import { RootState } from '../../reducer'
import { REFILL_MANA_SUCCESS } from './actions'

export const isRefillIdle = (state: RootState, address: string = '') =>
  getPendingTransactions(state, address).filter(
    (tx) => tx.actionType === REFILL_MANA_SUCCESS
  )
