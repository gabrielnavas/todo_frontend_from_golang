import * as actionTypes from '../actionTypes'

export const resetAllMessages = () => ({
  type: actionTypes.LOGIN_RESET_ALL_MESSAGES
})

export const loginUserRequest = (param: actionTypes.LoginUserRequest) => ({
  type: actionTypes.LOGIN_USER_REQUEST,
  payload: param
})

export const loginUserSuccess = (param: actionTypes.LoginUserSuccess) => ({
  type: actionTypes.LOGIN_USER_SUCCESS,
  payload: param
})

export const loginUserFail = (param: actionTypes.FailParamDefault) => ({
  type: actionTypes.LOGIN_USER_FAIL,
  payload: param
})
