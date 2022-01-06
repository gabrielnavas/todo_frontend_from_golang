import { HYDRATE } from 'next-redux-wrapper'
import { AnyAction } from 'redux'

import * as actionTypes from '../../actions/actionTypes'

type Todo = {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  statusId: number
  imageUrl?: string
}

type StatusTodo = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  todos: Todo[]
}

export type StateStatusTodo = {
  statusTodos: StatusTodo[]

  messageOk: string
  usecaseError: string
  serverError: string

  statusTodoUpdate: actionTypes.UpdateStatusTodoSetGlobal | null
  todoUpdate: actionTypes.UpdateTodoSetGlobal | null
}

const initialState: StateStatusTodo = {
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

    //* * ERRORS */
    case actionTypes.RESET_ALL_MESSAGES: {
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.messageOk = ''
      newState.usecaseError = ''
      newState.serverError = ''
      return newState
    }
    /** **** STATUS TODO */
    /** ADD STATUS TODO */
    case actionTypes.ADD_STATUS_TODO_SUCCESS: {
      const payload = action.payload as actionTypes.AddStatusTodoSuccess
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.messageOk = payload.messageOk
      newState.usecaseError = payload.usecaseError
      newState.statusTodos.unshift({
        id: payload.id,
        name: payload.name,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt,
        todos: []
      })
      return newState
    }

    case actionTypes.ADD_STATUS_TODO_FAIL: {
      const payload = action.payload as actionTypes.FailParamDefault
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.serverError = payload.message
      return newState
    }

    /** GET ALL STATUS TODO */

    case actionTypes.GET_ALL_STATUS_TODO_SUCCESS: {
      const payload: actionTypes.GetAllStatusTodoSuccess = action.payload
      const newState: StateStatusTodo = Object.assign({}, state)
      const newStatusTodos: StatusTodo[] = payload.map(statusTodo => ({ ...statusTodo, todos: [] }))
      newState.statusTodos = newStatusTodos
      return newState
      // return { ...state }
    }

    case actionTypes.GET_ALL_STATUS_TODO_FAIL: {
      const payload = action.payload as actionTypes.FailParamDefault
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.serverError = payload.message
      return newState
    }

    /** DELETE STATUS TODO */
    case actionTypes.DELETE_STATUS_TODO_SUCCESS: {
      const payload = action.payload as actionTypes.DeleteStatusTodoSuccess
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.messageOk = payload.messageOk
      newState.usecaseError = payload.usecaseError
      newState.statusTodos = newState.statusTodos.filter(statusTodo => statusTodo.id !== payload.statusTodoId)
      return newState
    }

    case actionTypes.DELETE_STATUS_TODO_FAIL: {
      const payload = action.payload as actionTypes.FailParamDefault
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.serverError = payload.message
      return newState
    }

    /** UPDATE STATUS TODO */
    case actionTypes.UPDATE_STATUS_TODO_SET_GLOBAL: {
      const payload = action.payload as actionTypes.UpdateStatusTodoSetGlobal
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.statusTodoUpdate = payload
      return newState
    }

    case actionTypes.UPDATE_STATUS_TODO_UNSET_GLOBAL: {
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.statusTodoUpdate = null
      return newState
    }

    case actionTypes.UPDATE_STATUS_TODO_SUCCESS: {
      debugger
      const payload = action.payload as actionTypes.UpdateStatusTodoSuccess
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.messageOk = payload.messageOk
      newState.usecaseError = payload.usecaseError
      newState.statusTodos = newState.statusTodos.map(statusTodo => {
        if (statusTodo.id === payload.id) {
          return {
            id: payload.id,
            name: payload.name,
            createdAt: statusTodo.createdAt,
            updatedAt: new Date(),
            todos: statusTodo.todos
          }
        }
        return statusTodo
      })
      return newState
    }

    case actionTypes.UPDATE_STATUS_TODO_FAIL: {
      const payload = action.payload as actionTypes.FailParamDefault
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.serverError = payload.message
      return newState
    }

    /** **** TODO */
    /** ADD TODO */
    case actionTypes.ADD_TODO_SUCCESS: {
      const payload = action.payload as actionTypes.AddTodoSuccess
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.messageOk = payload.messageOk
      newState.usecaseError = payload.usecaseError
      newState.statusTodos = newState.statusTodos.map(statusTodo => {
        if (statusTodo.id === payload.statusId) {
          statusTodo.todos.unshift({
            id: payload.id,
            title: payload.title,
            description: payload.description,
            createdAt: payload.createdAt,
            updatedAt: payload.updatedAt,
            statusId: payload.statusId,
            imageUrl: payload.imageUrl
          })
        }
        return statusTodo
      })
      return newState
    }

    case actionTypes.ADD_TODO_FAIL: {
      const payload = action.payload as actionTypes.FailParamDefault
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.serverError = payload.message
      return newState
    }

    /** UPDATE TODO */
    case actionTypes.UPDATE_TODO_SET_GLOBAL: {
      const payload = action.payload as actionTypes.UpdateTodoSetGlobal
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.todoUpdate = payload
      return newState
    }

    case actionTypes.UPDATE_TODO_UNSET_GLOBAL: {
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.todoUpdate = null
      return newState
    }

    case actionTypes.UPDATE_TODO_SUCCESS: {
      const payload = action.payload as actionTypes.UpdateTodoSuccess
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.messageOk = payload.messageOk
      newState.usecaseError = payload.usecaseError

      // remove
      newState.statusTodos = newState.statusTodos.map(statusTodo => {
        const todoFound = statusTodo.todos.find(todo => todo.id === payload.id)
        if (todoFound) {
          statusTodo.todos = statusTodo.todos.filter(todo => todo.id !== payload.id)
        }
        return statusTodo
      })

      // add
      newState.statusTodos = newState.statusTodos.map(statusTodo => {
        if (statusTodo.id === payload.statusId) {
          statusTodo.todos.unshift({
            id: payload.id,
            title: payload.title,
            description: payload.description,
            createdAt: payload.createdAt,
            updatedAt: payload.updatedAt,
            statusId: payload.statusId,
            imageUrl: payload.imageUrl
          })
        }
        return statusTodo
      })
      return newState
    }

    case actionTypes.UPDATE_TODO_FAIL: {
      const payload = action.payload as actionTypes.FailParamDefault
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.serverError = payload.message
      return newState
    }

    /** DELETE TODO */
    case actionTypes.DELETE_TODO_SUCCESS: {
      const payload = action.payload as actionTypes.DeleteTodoSuccess
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.messageOk = payload.messageOk
      newState.usecaseError = payload.usecaseError
      newState.statusTodos = newState.statusTodos.map(statusTodo => {
        if (statusTodo.id === payload.statusId) {
          statusTodo.todos = statusTodo.todos.filter(todo => todo.id !== payload.todoId)
        }
        return statusTodo
      })
      return newState
    }

    case actionTypes.DELETE_TODO_FAIL: {
      const payload = action.payload as actionTypes.FailParamDefault
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.serverError = payload.message
      return newState
    }

    /** GET ALL TODO */
    case actionTypes.GET_ALL_TODO_SUCCESS: {
      const payload: actionTypes.GetAllTodoSuccess = action.payload
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.statusTodos = newState.statusTodos.map(statusTodo => {
        const allTodoThisStatusTodo = payload.filter(todo => todo.statusId === statusTodo.id)
        statusTodo.todos = [...allTodoThisStatusTodo]
        return statusTodo
      })
      return newState
      // return { ...state }
    }

    case actionTypes.GET_ALL_TODO_FAIL: {
      const payload = action.payload as actionTypes.FailParamDefault
      const newState: StateStatusTodo = Object.assign({}, state)
      newState.serverError = payload.message
      return newState
    }

    default:
      return state
  }
}

export default reducer
