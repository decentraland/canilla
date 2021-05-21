import * as React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Props, State } from './FaucetPage.types'
import { Page, Header, Field, Button, Mana, Segment } from 'decentraland-ui'
import { Navbar } from 'decentraland-dapps/dist/containers'
import './FaucetPage.css'

const REFILL_AMOUNT = '100000000000000000000000' // 100k

export default class FaucetPage extends React.PureComponent<Props, State> {
  handleRefilll = (event: React.FormEvent<HTMLFormElement>) => {
    const { wallet, onRefillMana } = this.props
    onRefillMana(wallet ? wallet.address : '', REFILL_AMOUNT)

    event.preventDefault()
  }

  handleDisabledSubmit() {
    // Nothing to do here
  }

  render() {
    const  {isConnecting, isConnected, isRefillIdle, wallet  } = this.props

    const mana = wallet && wallet.networks && wallet.networks.ETHEREUM
        ? wallet.networks.ETHEREUM.mana : 0
    const isAlreadyTopedUp  = isConnected && mana >= parseInt(REFILL_AMOUNT, 10)

    return (
      <>
      <Navbar />
      <Page className="FaucetPage">
       <Segment>
        <Header size="large">{t('faucet_page.title')}</Header>
          <Header sub>
          {t('faucet_page.refill_with')}{' '}
            <Mana inline>{REFILL_AMOUNT.toLocaleString()}</Mana>
          </Header>

          <form  onSubmit={isConnected ? this.handleRefilll : this.handleDisabledSubmit} >
          <br />
            <br />
          <Field
            type={isConnected ? 'address' : 'text'}
            label={t('global.wallet')}
            value={                 isConnecting
              ? t('global.connecting')
              : isConnected
                ? wallet && wallet.address
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
                  !isConnected || isRefillIdle || isAlreadyTopedUp
                }
                loading={isRefillIdle}
              >
                {t('global.refill')}
              </Button>
              {isRefillIdle ? (
                <i>{t('faucet_page.transaction_pending')}</i>
              ) : isAlreadyTopedUp ? (
                <i>{t('faucet_page.already_toped_up')}</i>
              ) : null}
               </>
          ) : null}
        </form>
      </Segment>
      </Page>
      </>
    )
  }
}
