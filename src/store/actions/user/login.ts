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

export const loginUserCredencialsWrong = (param: actionTypes.LoginUserCredencialsWrong) => ({
  type: actionTypes.LOGIN_USER_CREDENCIALS_WRONG,
  payload: param
})

export const loginUserFail = (param: actionTypes.FailParamDefault) => ({
  type: actionTypes.LOGIN_USER_FAIL,
  payload: param
})

export const logOffUserRequest = () => ({
  type: actionTypes.LOGOFF_USER_REQUEST
})

export const logOffUserSuccess = () => ({
  type: actionTypes.LOGOFF_USER_SUCCESS
})

export const logOffUserFail = () => ({
  type: actionTypes.LOGOFF_USER_FAIL
})
