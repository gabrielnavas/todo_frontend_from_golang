import { HYDRATE } from 'next-redux-wrapper'
import { AnyAction } from 'redux'

import * as actionTypes from '../../actions/actionTypes'

export type StateUser = {
  token: string;
  user: {
      id: number;
      name: string;
      username: string;
      email: string;
      levelAccess: number;
      createdAt: Date;
      updatedAt: Date;
  }

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

  messageOk: '',
  usecaseError: '',
  serverError: ''
}

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state }

    case actionTypes.RESET_ALL_MESSAGES: {
      const newState: StateUser = Object.assign({}, state)
      newState.messageOk = ''
      newState.usecaseError = ''
      newState.serverError = ''
      return newState
    }

    case actionTypes.LOGIN_USER_SUCCESS: {
      const payload: actionTypes.LoginUserSuccess = action.payload
      const newState: StateUser = Object.assign({}, state)
      newState.token = payload.token
      newState.user = payload.user
      newState.messageOk = payload.messageOk
      newState.usecaseError = payload.usecaseError
      return newState
    }

    default:
      return state
  }
}

export default reducer
