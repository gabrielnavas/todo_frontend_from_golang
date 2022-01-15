import * as actionTypes from '../actionTypes'

export const resetAllMessages = () => ({
  type: actionTypes.RESET_ALL_MESSAGES
})

export const AddMessagesSuccess = (payload: actionTypes.AddMessagesSuccess) => ({
  type: actionTypes.ADD_MESSAGES_SUCCESS,
  payload
})

export const AddMessageUsecaseError = (payload: actionTypes.AddMessageUsecaseErrors) => ({
  type: actionTypes.ADD_MESSAGES_SUCCESS,
  payload
})

export const AddMessageServerError = (payload: actionTypes.AddMessageServerErrors) => ({
  type: actionTypes.ADD_MESSAGE_SERVER_ERRORS,
  payload
})
