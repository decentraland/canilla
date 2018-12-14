import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import App from '@dapps/containers/App'

import { locations } from 'locations'
import FaucetPage from 'components/FaucetPage'

export default class Routes extends React.Component {
  renderRoutes() {
    return (
      <Switch>
        <Route exact={true} path={locations.root()} component={FaucetPage} />
        <Route exact={true} path={locations.faucet()} component={FaucetPage} />
        <Redirect to={locations.root()} />
      </Switch>
    )
  }

  render() {
    return <App locales={['en']}>{this.renderRoutes()}</App>
  }
}
