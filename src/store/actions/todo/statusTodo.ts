import * as actionTypes from '../actionTypes'

/** ADD STATUS TODO */
export const addStatusTodoRequest = (param: actionTypes.AddStatusTodoRequest) => ({
  type: actionTypes.ADD_STATUS_TODO_REQUEST,
  payload: param
})

export const addStatusTodoSuccess = (param: actionTypes.AddStatusTodoSuccess) => ({
  type: actionTypes.ADD_STATUS_TODO_SUCCESS,
  payload: param
})

export const addStatusTodoFail = () => ({
  type: actionTypes.ADD_STATUS_TODO_FAIL
})

/** GET ALL STATUS TODO */
export const getAllStatusTodoRequest = () => ({
  type: actionTypes.GET_ALL_STATUS_TODO_REQUEST
})

export const getAllStatusTodoSuccess = (param: actionTypes.GetAllStatusTodoSuccess) => ({
  type: actionTypes.GET_ALL_STATUS_TODO_SUCCESS,
  payload: param
})

export const getAllStatusTodoFail = () => ({
  type: actionTypes.GET_ALL_STATUS_TODO_FAIL
})

/** DELETE STATUS TODO */
export const deleteStatusTodoRequest = (param: actionTypes.DeleteStatusTodoRequest) => ({
  type: actionTypes.DELETE_STATUS_TODO_REQUEST,
  payload: param
})

export const deleteStatusTodoSuccess = (param: actionTypes.DeleteStatusTodoSuccess) => ({
  type: actionTypes.DELETE_STATUS_TODO_SUCCESS,
  payload: param
})

export const deleteStatusTodoFail = () => ({
  type: actionTypes.DELETE_STATUS_TODO_FAIL
})

/** UPDATE STATUS TODO */
export const updateStatusTodoSetGlobal = (param: actionTypes.UpdateStatusTodoSetGlobal) => ({
  type: actionTypes.UPDATE_STATUS_TODO_SET_GLOBAL,
  payload: param
})

export const updateStatusTodoUnSetGlobal = () => ({
  type: actionTypes.UPDATE_STATUS_TODO_UNSET_GLOBAL
})

export const updateStatusTodoRequest = (param: actionTypes.UpdateStatusTodoRequest) => ({
  type: actionTypes.UPDATE_STATUS_TODO_REQUEST,
  payload: param
})

export const updateStatusTodoSuccess = (param: actionTypes.UpdateStatusTodoSuccess) => ({
  type: actionTypes.UPDATE_STATUS_TODO_SUCCESS,
  payload: param
})

export const updateStatusTodoFail = () => ({
  type: actionTypes.UPDATE_STATUS_TODO_FAIL
})
