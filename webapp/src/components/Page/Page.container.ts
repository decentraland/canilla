import { connect } from 'react-redux'
import { RootState } from 'types'
import { MapStateProps, MapDispatchProps } from 'components/Page/Page.types'
import Page from './Page'

const mapState = (_: RootState): MapStateProps => ({})

const mapDispatch = (): MapDispatchProps => ({})

export default connect(
  mapState,
  mapDispatch
)(Page)
