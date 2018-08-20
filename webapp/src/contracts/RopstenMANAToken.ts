import { eth, Contract } from 'decentraland-eth'

const { abi } = require('./RopstenMANAToken.json')

export class RopstenMANAToken extends Contract {
  constructor(address: string) {
    super(address, abi)
  }

  getContractName() {
    return 'MANAToken'
  }

  async balanceOf(owner: string): Promise<number> {
    const manaBalance = await this.sendCall('balanceOf', owner)
    return eth.utils.fromWei(manaBalance)
  }

  async setBalance(to: string, mana: number) {
    return this.sendTransaction('setBalance', to, eth.utils.toWei(mana))
  }
}
