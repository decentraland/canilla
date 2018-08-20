import { action } from 'typesafe-actions'
import { BaseWallet } from '@dapps/modules/wallet/types'
import { buildTransactionPayload } from '@dapps/modules/transaction/utils'

export const REFILL_MANA_REQUEST = '[Request] Refill MANA Wallet'
export const REFILL_MANA_SUCCESS = '[Success] Refill MANA Wallet'
export const REFILL_MANA_FAILURE = '[Failure] Refill MANA Wallet'

export const refillManaRequest = (
  address: BaseWallet['address'],
  mana: BaseWallet['mana']
) => action(REFILL_MANA_REQUEST, { address, mana })
export const refillManaSuccess = (
  txHash: string,
  address: BaseWallet['address'],
  newMana: BaseWallet['mana']
) =>
  action(REFILL_MANA_SUCCESS, {
    address,
    newMana,
    ...buildTransactionPayload(txHash, { address, newMana })
  })
export const refillManaFailure = (error: string) =>
  action(REFILL_MANA_FAILURE, { error })

export type RefillManaRequestAction = ReturnType<typeof refillManaRequest>
export type RefillManaSuccessAction = ReturnType<typeof refillManaSuccess>
export type RefillManaFailureAction = ReturnType<typeof refillManaFailure>
