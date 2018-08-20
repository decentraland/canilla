import * as React from 'react'
import { eth } from 'decentraland-eth'
import { t } from '@dapps/modules/translation/utils'
import { Props, State } from 'components/FaucetPage/FaucetPage.types'
import { Header, Field, Button, Mana } from 'decentraland-ui'

const REFILL_AMOUNT = 100000 // 100k

export default class FaucetPage extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      address: '',
      mana: REFILL_AMOUNT
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { wallet } = this.props
    if (!prevProps.wallet.address && wallet.address) {
      this.setState({ address: wallet.address })
    }
  }

  handleRefilll = (event: React.FormEvent<HTMLFormElement>) => {
    const { onRefillMana } = this.props
    const { address, mana } = this.state

    if (eth.utils.isValidAddress(address)) {
      onRefillMana(address, mana)
    }
    event.preventDefault()
  }

  handleDisabledSubmit() {}

  render() {
    const { isConnecting, isConnected, wallet, onConnectWallet } = this.props
    const isAlreadyTopedUp = !!wallet.mana && wallet.mana >= REFILL_AMOUNT

    return (
      <div className="FaucetPage">
        <Header size="large">{t('faucet_page.title')}</Header>
        <div>
          {t('faucet_page.refill_with')}{' '}
          <Mana inline>{REFILL_AMOUNT.toLocaleString()}</Mana>
        </div>

        <form
          onSubmit={
            isConnected ? this.handleRefilll : this.handleDisabledSubmit
          }
        >
          <br />
          <br />
          <Field
            type={isConnected ? 'address' : 'text'}
            label={t('global.wallet')}
            value={
              isConnecting
                ? t('global.connecting')
                : isConnected
                  ? wallet.address
                  : t('faucet_page.no_wallet')
            }
            disabled={true}
            loading={isConnecting}
          />

          {isConnecting ? null : isConnected ? (
            <>
              <Button
                primary
                type="submit"
                disabled={!isConnected || isAlreadyTopedUp}
              >
                {t('global.refill')}
              </Button>
              {isConnected && isAlreadyTopedUp ? (
                <i>{t('faucet_page.already_toped_up')}</i>
              ) : null}
            </>
          ) : (
            <Button secondary onClick={onConnectWallet}>
              {t('global.reconnect')}
            </Button>
          )}
        </form>
      </div>
    )
  }
}
