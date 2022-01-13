import { HYDRATE } from 'next-redux-wrapper'
import { AnyAction } from 'redux'

import * as actionTypes from '../../actions/actionTypes'

export type StateUser = {
  token: string
  user: {
      id: number
      name: string
      username: string
      email: string
      levelAccess: number
      createdAt: Date
      updatedAt: Date
  }

  isLogging: boolean

  isLoading: boolean
  messageOk: string,
  usecaseError: string,
  serverError: string,
}

const initialState: StateUser = {
  token: '',
  user: {
    id: 0,
    name: '',
    username: '',
    email: '',
    levelAccess: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  isLogging: false,

  isLoading: false,
  messageOk: '',
  usecaseError: '',
  serverError: ''
}

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state }

    case actionTypes.LOGIN_RESET_ALL_MESSAGES: {
      const newState: StateUser = Object.assign({}, state)
      newState.messageOk = ''
      newState.usecaseError = ''
      newState.serverError = ''
      return newState
    }

    case actionTypes.LOGIN_USER_REQUEST: {
      const newState: StateUser = Object.assign({}, state)
      newState.isLoading = true
      return newState
    }

    case actionTypes.LOGIN_USER_SUCCESS: {
      const payload: actionTypes.LoginUserSuccess = action.payload
      const newState: StateUser = Object.assign({}, state)
      newState.token = payload.token
      newState.user = payload.user
      newState.messageOk = payload.messageOk
      newState.usecaseError = payload.usecaseError
      newState.isLoading = false
      newState.isLogging = true
      return newState
    }

    case actionTypes.LOGIN_USER_FAIL: {
      const payload: actionTypes.FailParamDefault = action.payload
      const newState: StateUser = Object.assign({}, state)
      newState.serverError = payload.message
      newState.isLoading = false
      return newState
    }

    default:
      return state
  }
}

export default reducer
