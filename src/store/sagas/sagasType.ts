import { Action } from 'redux'
import { Reducers } from '../reducers/reducerRoot'

export type CustomActionSaga<T> = {
  payload: T
} & Action

export type SelectState = (state: Reducers) => Reducers
