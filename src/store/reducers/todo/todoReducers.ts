import * as todoTypes from './todoTypes'
import * as actionTypes from '../../actions/actionTypes'

export const addTodoSuccessReducer = (state: todoTypes.StateStatusTodo, payload: actionTypes.AddTodoSuccess) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
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

export const addTodoFailReducer = (state: todoTypes.StateStatusTodo, payload: actionTypes.FailParamDefault) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
  newState.serverError = payload.message
  return newState
}

export const updateTodoSetGlobalReducer = (state: todoTypes.StateStatusTodo, payload: actionTypes.UpdateTodoSetGlobal) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
  newState.todoUpdate = payload
  return newState
}

export const updateTodoUnSetGlobalReducer = (state: todoTypes.StateStatusTodo) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
  newState.todoUpdate = null
  return newState
}

export const updateTodoSuccessReducer = (state: todoTypes.StateStatusTodo, payload: actionTypes.UpdateTodoSuccess) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
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

export const updateTodoFailReducer = (state: todoTypes.StateStatusTodo, payload: actionTypes.FailParamDefault) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
  newState.serverError = payload.message
  return newState
}

export const deleteTodoSuccessReducer = (state: todoTypes.StateStatusTodo, payload: actionTypes.DeleteTodoSuccess) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
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

export const deleteTodoFailReducer = (state: todoTypes.StateStatusTodo, payload: actionTypes.FailParamDefault) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
  newState.serverError = payload.message
  return newState
}

export const getAllTodoSuccessReducer = (state: todoTypes.StateStatusTodo, payload: actionTypes.GetAllTodoSuccess) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
  newState.statusTodos = newState.statusTodos.map(statusTodo => {
    const allTodoThisStatusTodo = payload.filter(todo => todo.statusId === statusTodo.id)
    statusTodo.todos = [...allTodoThisStatusTodo]
    return statusTodo
  })
  return newState
}

export const getAllTodoFailReducer = (state: todoTypes.StateStatusTodo, payload: actionTypes.FailParamDefault) => {
  const newState: todoTypes.StateStatusTodo = Object.assign({}, state)
  newState.serverError = payload.message
  return newState
}
