import {
  walletReducer as baseWallerReducer,
  INITIAL_STATE,
  WalletReducerAction as BaseWalletReducerAction
} from '@dapps/modules/wallet/reducer'
import {
  FETCH_TRANSACTION_SUCCESS,
  FetchTransactionSuccessAction
} from '@dapps/modules/transaction/actions'
import {
  Transaction
} from '@dapps/modules/transaction/types'
import {
  REFILL_MANA_SUCCESS,
  RefillManaRequestAction,
  RefillManaSuccessAction,
  RefillManaFailureAction
} from 'modules/wallet/actions'

export type WalletReducerAction =
  | RefillManaRequestAction
  | RefillManaSuccessAction
  | RefillManaFailureAction
  | FetchTransactionSuccessAction
  | BaseWalletReducerAction

export type SuccessTransaction = Transaction & {
  payload: RefillManaSuccessAction['payload']
}

export function walletReducer(
  state = INITIAL_STATE,
  action: WalletReducerAction
) {
  switch (action.type) {
    case FETCH_TRANSACTION_SUCCESS: {
      const transaction: SuccessTransaction = action.payload.transaction as any

      switch (transaction.actionType) {
        case REFILL_MANA_SUCCESS: {
          return {
            ...state,
            data: {
              ...state.data,
              mana: transaction.payload.newMana
            }
          }
        }
        default:
          return state
      }
    }
    default:
      return baseWallerReducer(state, action as BaseWalletReducerAction)
  }
}
