import * as todoTypes from './todoTypes'
import * as actionTypes from '../../actions/actionTypes'

export const addStatusTodoSuccessReducer = (state: todoTypes.StateStatusTodo, payload: actionTypes.AddStatusTodoSuccess) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
  newState.statusTodos.push({
    id: payload.id,
    name: payload.name,
    createdAt: payload.createdAt,
    updatedAt: payload.updatedAt,
    todos: []
  })
  return newState
}

export const addStatusTodoFailReducer = (state: todoTypes.StateStatusTodo) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
  return newState
}

export const getAllStatusTodoSuccessReducer = (state: todoTypes.StateStatusTodo, payload: actionTypes.GetAllStatusTodoSuccess) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
  const newStatusTodos: todoTypes.StatusTodo[] = payload.map(statusTodo => ({ ...statusTodo, todos: [] }))
  newState.statusTodos = newStatusTodos
  return newState
}

export const getAllStatusTodoFailReducer = (state: todoTypes.StateStatusTodo) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
  return newState
}

export const deleteStatusTodoSuccessReducer = (state: todoTypes.StateStatusTodo, payload: actionTypes.DeleteStatusTodoSuccess) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
  newState.statusTodos = newState.statusTodos.filter(statusTodo => statusTodo.id !== payload.statusTodoId)
  return newState
}

export const deleteStatusTodoFailReducer = (state: todoTypes.StateStatusTodo) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
  return newState
}

export const updateStatusTodoSetGlobalReducer = (state: todoTypes.StateStatusTodo, payload: actionTypes.UpdateStatusTodoSetGlobal) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
  newState.statusTodoUpdate = payload
  return newState
}

export const updateStatusTodoUnSetGlobalReducer = (state: todoTypes.StateStatusTodo) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
  newState.statusTodoUpdate = null
  return newState
}

export const updateStatusTodoSuccessReducer = (state: todoTypes.StateStatusTodo, payload: actionTypes.UpdateStatusTodoSuccess) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
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

export const updateStatusTodoFailReducer = (state: todoTypes.StateStatusTodo) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
  return newState
}
