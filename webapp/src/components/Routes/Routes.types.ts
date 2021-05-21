import { Dispatch } from 'redux'

export type Props = {
  isConnected: boolean
}
export type MapStateProps = Pick<Props, 'isConnected'>

export type MapDispatchProps = Props
export type MapDispatch = Dispatch
