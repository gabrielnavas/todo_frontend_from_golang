import { HYDRATE } from 'next-redux-wrapper'
import { AnyAction } from 'redux'

import * as actionTypes from '../../actions/actionTypes'
import { addStatusTodoFailReducer, addStatusTodoSuccessReducer, deleteStatusTodoFailReducer, deleteStatusTodoSuccessReducer, getAllStatusTodoFailReducer, getAllStatusTodoSuccessReducer, updateStatusTodoFailReducer, updateStatusTodoSetGlobalReducer, updateStatusTodoSuccessReducer, updateStatusTodoUnSetGlobalReducer } from './stateTodoReducers'
import { addTodoFailReducer, addTodoSuccessReducer, deleteTodoFailReducer, deleteTodoSuccessReducer, getAllTodoFailReducer, getAllTodoSuccessReducer, updateTodoFailReducer, updateTodoSetGlobalReducer, updateTodoSuccessReducer, updateTodoUnSetGlobalReducer } from './todoReducers'
import * as todoTypes from './todoTypes'

const initialState: todoTypes.StateStatusTodo = {
  statusTodos: [],

  messageOk: '',
  usecaseError: '',
  serverError: '',

  statusTodoUpdate: null,
  todoUpdate: null
}

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state }

    case actionTypes.RESET_ALL_MESSAGES: {
      const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
      newState.messageOk = ''
      newState.usecaseError = ''
      newState.serverError = ''
      return newState
    }

    case actionTypes.ADD_STATUS_TODO_SUCCESS: {
      return addStatusTodoSuccessReducer(state, action.payload)
    }

    case actionTypes.ADD_STATUS_TODO_FAIL: {
      return addStatusTodoFailReducer(state, action.payload)
    }

    case actionTypes.GET_ALL_STATUS_TODO_SUCCESS: {
      return getAllStatusTodoSuccessReducer(state, action.payload)
    }

    case actionTypes.GET_ALL_STATUS_TODO_FAIL: {
      return getAllStatusTodoFailReducer(state, action.payload)
    }

    case actionTypes.DELETE_STATUS_TODO_SUCCESS: {
      return deleteStatusTodoSuccessReducer(state, action.payload)
    }

    case actionTypes.DELETE_STATUS_TODO_FAIL: {
      return deleteStatusTodoFailReducer(state, action.payload)
    }

    case actionTypes.UPDATE_STATUS_TODO_SET_GLOBAL: {
      return updateStatusTodoSetGlobalReducer(state, action.payload)
    }

    case actionTypes.UPDATE_STATUS_TODO_UNSET_GLOBAL: {
      return updateStatusTodoUnSetGlobalReducer(state)
    }

    case actionTypes.UPDATE_STATUS_TODO_SUCCESS: {
      return updateStatusTodoSuccessReducer(state, action.payload)
    }

    case actionTypes.UPDATE_STATUS_TODO_FAIL: {
      return updateStatusTodoFailReducer(state, action.payload)
    }

    case actionTypes.ADD_TODO_SUCCESS: {
      return addTodoSuccessReducer(state, action.payload)
    }

    case actionTypes.ADD_TODO_FAIL: {
      return addTodoFailReducer(state, action.payload)
    }

    case actionTypes.UPDATE_TODO_SET_GLOBAL: {
      return updateTodoSetGlobalReducer(state, action.payload)
    }

    case actionTypes.UPDATE_TODO_UNSET_GLOBAL: {
      return updateTodoUnSetGlobalReducer(state)
    }

    case actionTypes.UPDATE_TODO_SUCCESS: {
      return updateTodoSuccessReducer(state, action.payload)
    }

    case actionTypes.UPDATE_TODO_FAIL: {
      return updateTodoFailReducer(state, action.payload)
    }

    case actionTypes.DELETE_TODO_SUCCESS: {
      return deleteTodoSuccessReducer(state, action.payload)
    }

    case actionTypes.DELETE_TODO_FAIL: {
      return deleteTodoFailReducer(state, action.payload)
    }

    case actionTypes.GET_ALL_TODO_SUCCESS: {
      return getAllTodoSuccessReducer(state, action.payload)
    }

    case actionTypes.GET_ALL_TODO_FAIL: {
      return getAllTodoFailReducer(state, action.payload)
    }

    default:
      return state
  }
}

export default reducer
