import * as actionTypes from '../actionTypes'

export const loginUserRequest = (param: actionTypes.LoginUserRequest) => ({
  type: actionTypes.LOGIN_USER_REQUEST,
  payload: param
})

export const loginUserSuccess = (param: actionTypes.LoginUserSuccess) => ({
  type: actionTypes.LOGIN_USER_SUCCESS,
  payload: param
})

export const loginUserCredencialsWrong = () => ({
  type: actionTypes.LOGIN_USER_CREDENCIALS_WRONG
})

export const loginUserFail = () => ({
  type: actionTypes.LOGIN_USER_FAIL
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
