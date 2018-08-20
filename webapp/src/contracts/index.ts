import { env } from 'decentraland-commons'
import { RopstenMANAToken } from './RopstenMANAToken'

const manaToken = new RopstenMANAToken(
  env.get('REACT_APP_MANA_TOKEN_CONTRACT_ADDRESS')
)

export { manaToken }
