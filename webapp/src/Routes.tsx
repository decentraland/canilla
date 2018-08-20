import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { locations } from 'locations'

import Page from 'components/Page'
import FaucetPage from 'components/FaucetPage'

export default class Routes extends React.Component {
  renderRoutes() {
    return (
      <Switch>
        <Route exact={true} path={locations.root()} component={FaucetPage} />
        <Route
          exact={true}
          path={locations.faucet()}
          component={FaucetPage}
        />
        <Redirect to={locations.root()} />
      </Switch>
    )
  }

  render() {
    return <Page>{this.renderRoutes()}</Page>
  }
}
