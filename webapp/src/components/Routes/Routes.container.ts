import { connect } from 'react-redux'
import { isConnected } from 'decentraland-dapps/dist/modules/wallet/selectors'

import { RootState } from '../../reducer'
import Routes from './Routes'
import { MapStateProps } from './Routes.types'

const mapState = (state: RootState): MapStateProps => ({
  isConnected: isConnected(state)
})

const mapDispatch = () => ({})

export default connect(mapState, mapDispatch)(Routes)
