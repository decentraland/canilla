import { connect } from 'react-redux'
import { RootDispatch } from '@dapps/types'
import { RootState } from 'types'
import { MapStateProps, MapDispatchProps } from 'components/Page/Page.types'
import Page from './Page'

const mapState = (_: RootState): MapStateProps => ({})

const mapDispatch = (dispatch: RootDispatch): MapDispatchProps => ({})

export default connect(
  mapState,
  mapDispatch
)(Page)
