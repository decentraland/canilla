import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { SignInPage } from '../SignInPage'

import { locations } from '../../locations'
import { FaucetPage } from '..//FaucetPage'

import { Props } from './Routes.types'

const Routes = ({ isConnected }: Props) => {
  if (!isConnected) {
    return (
      <>
        <Switch>
          <Route exact path={locations.signIn()} component={SignInPage} />
          <Redirect to={locations.signIn()} />
        </Switch>
      </>
    )
  }

  return (
    <Switch>
      <Route exact path={locations.root()} component={FaucetPage} />
      <Route exact path={locations.faucet()} component={FaucetPage} />
      <Redirect to={locations.root()} />
    </Switch>
  )
}

export default Routes
