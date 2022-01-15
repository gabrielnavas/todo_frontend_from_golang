import { HYDRATE } from 'next-redux-wrapper'
import { AnyAction } from 'redux'

import * as actionTypes from '../../actions/actionTypes'

export type StateMessage = {
  messagesSuccess: string[]
  usecaseErrors: string[]
  serverErrors: string[]
}

const initialState: StateMessage = {
  messagesSuccess: [],
  usecaseErrors: [],
  serverErrors: []
}

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state }

    case actionTypes.RESET_ALL_MESSAGES: {
      const newState: StateMessage = Object.assign({}, state)
      newState.messagesSuccess = []
      newState.usecaseErrors = []
      newState.serverErrors = []
      return newState
    }

    case actionTypes.ADD_MESSAGE_USECASE_ERRORS: {
      const newState: StateMessage = Object.assign({}, state)
      const payload: actionTypes.AddMessageUsecaseErrors = action.payload
      newState.usecaseErrors = payload.usecaseErrors
      return newState
    }

    case actionTypes.ADD_MESSAGE_SERVER_ERRORS: {
      const newState: StateMessage = Object.assign({}, state)
      const payload: actionTypes.AddMessageServerErrors = action.payload
      newState.serverErrors = payload.serverErrors
      return newState
    }

    case actionTypes.ADD_MESSAGES_SUCCESS: {
      const newState: StateMessage = Object.assign({}, state)
      const payload: actionTypes.AddMessagesSuccess = action.payload
      newState.messagesSuccess = payload.messagesSuccess
      return newState
    }

    default:
      return state
  }
}

export default reducer
