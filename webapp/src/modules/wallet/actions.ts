import { action } from 'typesafe-actions'
import { buildTransactionPayload } from 'decentraland-dapps/dist//modules/transaction/utils'
import { ChainId } from '@dcl/schemas'

export const REFILL_MANA_REQUEST = '[Request] Refill MANA Wallet'
export const REFILL_MANA_SUCCESS = '[Success] Refill MANA Wallet'
export const REFILL_MANA_FAILURE = '[Failure] Refill MANA Wallet'

export const refillManaRequest = (address: string, mana: string) => action(REFILL_MANA_REQUEST, { address, mana })
export const refillManaSuccess = (
  txHash: string,
  address: string,
  newMana: string,
  chainId: ChainId
) =>
  action(REFILL_MANA_SUCCESS, {
    address,
    newMana,
    ...buildTransactionPayload(chainId, txHash, { address, newMana })
  })
export const refillManaFailure = (error: string) =>
  action(REFILL_MANA_FAILURE, { error })

export type RefillManaRequestAction = ReturnType<typeof refillManaRequest>
export type RefillManaSuccessAction = ReturnType<typeof refillManaSuccess>
export type RefillManaFailureAction = ReturnType<typeof refillManaFailure>
