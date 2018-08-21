import * as React from 'react'
import { eth } from 'decentraland-eth'
import { t } from '@dapps/modules/translation/utils'
import { Props, State } from 'components/FaucetPage/FaucetPage.types'
import { Header, Field, Button, Mana, Segment } from 'decentraland-ui'
import './FaucetPage.css'

const REFILL_AMOUNT = 100000 // 100k

export default class FaucetPage extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      address: '',
      mana: REFILL_AMOUNT
    }
  }

  componentDidUpdate(prevProps: Props) {
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

  handleDisabledSubmit() {
    // Nothing to do here
  }

  render() {
    const {
      isConnecting,
      isConnected,
      isRefillIdle,
      wallet,
      onConnectWallet
    } = this.props
    const isAlreadyTopedUp =
      isConnected && (wallet.mana as number) >= REFILL_AMOUNT
    const isRopsten = isConnected && wallet.network === 'ropsten'

    return (
      <Segment className="FaucetPage">
        <Header size="large">{t('faucet_page.title')}</Header>
        <Header sub>
          {t('faucet_page.refill_with')}{' '}
          <Mana inline>{REFILL_AMOUNT.toLocaleString()}</Mana>
        </Header>

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
            disabled
            loading={isConnecting}
          />

          {isConnecting ? null : isConnected ? (
            <>
              <Button
                primary
                type="submit"
                disabled={
                  !isConnected || !isRopsten || isRefillIdle || isAlreadyTopedUp
                }
                loading={isRefillIdle}
              >
                {t('global.refill')}
              </Button>
              {isRefillIdle ? (
                <i>{t('faucet_page.transaction_pending')}</i>
              ) : !isRopsten ? (
                <i>{t('faucet_page.incorrect_network')}</i>
              ) : isAlreadyTopedUp ? (
                <i>{t('faucet_page.already_toped_up')}</i>
              ) : null}
            </>
          ) : (
            <Button primary onClick={onConnectWallet}>
              {t('global.reconnect')}
            </Button>
          )}
        </form>
      </Segment>
    )
  }
}
