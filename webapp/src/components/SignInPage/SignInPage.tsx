import * as React from 'react'
import { default as SignIn } from 'decentraland-dapps/dist/containers/SignInPage'
import { Footer } from 'decentraland-dapps/dist/containers'
import { Page } from 'decentraland-ui'

import './SignInPage.css'

const SignInPage = () => {
  return (
    <>
      <Page className="SignInPage" isFullscreen>
        <SignIn />
      </Page>
      <Footer isFullscreen />
    </>
  )
}

export default React.memo(SignInPage)
