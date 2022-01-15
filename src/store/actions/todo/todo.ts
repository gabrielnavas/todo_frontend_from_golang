import * as actionTypes from '../actionTypes'

export const addTodoRequest = (param: actionTypes.AddTodoRequest) => ({
  type: actionTypes.ADD_TODO_REQUEST,
  payload: param
})

export const addTodoSuccess = (param: actionTypes.AddTodoSuccess) => ({
  type: actionTypes.ADD_TODO_SUCCESS,
  payload: param
})

export const addTodoFail = () => ({
  type: actionTypes.ADD_TODO_FAIL
})

export const updateTodoSetGlobal = (param: actionTypes.UpdateTodoSetGlobal) => ({
  type: actionTypes.UPDATE_TODO_SET_GLOBAL,
  payload: param
})

export const updateTodoUnSetGlobal = () => ({
  type: actionTypes.UPDATE_TODO_UNSET_GLOBAL
})

export const updateTodoRequest = (param: actionTypes.UpdateTodoRequest) => ({
  type: actionTypes.UPDATE_TODO_REQUEST,
  payload: param
})

export const updateTodoSuccess = (param: actionTypes.UpdateTodoSuccess) => ({
  type: actionTypes.UPDATE_TODO_SUCCESS,
  payload: param
})

export const updateTodoFail = () => ({
  type: actionTypes.UPDATE_TODO_FAIL
})

export const deleteTodoRequest = (param: actionTypes.DeleteTodoRequest) => ({
  type: actionTypes.DELETE_TODO_REQUEST,
  payload: param
})

export const deleteTodoSuccess = (param: actionTypes.DeleteTodoSuccess) => ({
  type: actionTypes.DELETE_TODO_SUCCESS,
  payload: param
})

export const deleteTodoFail = () => ({
  type: actionTypes.DELETE_TODO_FAIL
})

export const getAllTodoRequest = () => ({
  type: actionTypes.GET_ALL_TODO_REQUEST
})

export const getAllTodoSuccess = (param: actionTypes.GetAllTodoSuccess) => ({
  type: actionTypes.GET_ALL_TODO_SUCCESS,
  payload: param
})

export const getAllTodoFail = () => ({
  type: actionTypes.GET_ALL_TODO_FAIL
})
