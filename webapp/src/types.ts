import { Reducer, Store } from 'redux'

import { RootState } from './reducer'

export type RootStore = Store<RootState>
export type RootReducer = Reducer<RootState>
