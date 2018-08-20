import * as React from 'react'

import { Container } from 'decentraland-ui'
import Navbar from '@dapps/containers/Navbar'
import { Props } from 'components/Page/Page.types'

import './Page.css'

export default class Page extends React.PureComponent<Props> {
  render() {
    const { children } = this.props

    return (
      <>
        <Navbar />
        <div className="Page">
          <Container text={true}>{children}</Container>
        </div>
      </>
    )
  }
}
