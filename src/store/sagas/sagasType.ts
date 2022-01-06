import { Action } from 'redux'

export type CustomActionSaga<T> = {
  payload: T
} & Action
