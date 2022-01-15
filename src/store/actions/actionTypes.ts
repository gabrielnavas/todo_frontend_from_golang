/** ** Messages */
export const RESET_ALL_MESSAGES = 'RESET_ALL_MESSAGES'
export const ADD_MESSAGES_SUCCESS = 'ADD_MESSAGES_SUCCESS'
export type AddMessagesSuccess = {
  messagesSuccess: string[]
}
export const ADD_MESSAGE_USECASE_ERRORS = 'ADD_MESSAGE_USECASE_ERRORS'
export type AddMessageUsecaseErrors = {
  usecaseErrors: string[]
}
export const ADD_MESSAGE_SERVER_ERRORS = 'ADD_MESSAGE_SERVER_ERRORS'
export type AddMessageServerErrors = {
  serverErrors: string[]
}

/** ** Status Todo ****/

export const ADD_STATUS_TODO_REQUEST = 'ADD_STATUS_TODO_REQUEST'
export type AddStatusTodoRequest = {
  name: string
}

export const ADD_STATUS_TODO_SUCCESS = 'ADD_STATUS_TODO_SUCCESS'
export type AddStatusTodoSuccess = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export const ADD_STATUS_TODO_FAIL = 'ADD_STATUS_TODO_FAIL'

export const GET_ALL_STATUS_TODO_REQUEST = 'GET_ALL_STATUS_TODO_REQUEST'
export const GET_ALL_STATUS_TODO_SUCCESS = 'GET_ALL_STATUS_TODO_SUCCESS'
export type GetAllStatusTodoSuccess = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}[]
export const GET_ALL_STATUS_TODO_FAIL = 'GET_ALL_STATUS_TODO_FAIL'

export const DELETE_STATUS_TODO_REQUEST = 'DELETE_STATUS_TODO_REQUEST'
export type DeleteStatusTodoRequest = {
  statusTodoId: number
}
export const DELETE_STATUS_TODO_SUCCESS = 'DELETE_STATUS_TODO_SUCCESS'
export type DeleteStatusTodoSuccess = {
  statusTodoId: number
}
export const DELETE_STATUS_TODO_FAIL = 'DELETE_STATUS_TODO_FAIL'

export const UPDATE_STATUS_TODO_SET_GLOBAL = 'UPDATE_STATUS_TODO_SET_GLOBAL'
export type UpdateStatusTodoSetGlobal = {
  id: number
  name: string
}
export const UPDATE_STATUS_TODO_UNSET_GLOBAL = 'UPDATE_STATUS_TODO_UNSET_GLOBAL'
export const UPDATE_STATUS_TODO_REQUEST = 'UPDATE_STATUS_TODO_REQUEST'
export type UpdateStatusTodoRequest = {
  id: number
  name: string
}
export const UPDATE_STATUS_TODO_SUCCESS = 'UPDATE_STATUS_TODO_SUCCESS'
export type UpdateStatusTodoSuccess = {
  id: number
  name: string
}
export const UPDATE_STATUS_TODO_FAIL = 'UPDATE_STATUS_TODO_FAIL'

/** ** Todo ****/

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST'
export type AddTodoRequest = {
  title: string
  description: string
  image: File | null
  statusId: number
}
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'
export type AddTodoSuccess = {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  statusId: number
  imageUrl: string
}
export const ADD_TODO_FAIL = 'ADD_TODO_FAIL'

export const UPDATE_TODO_SET_GLOBAL = 'UPDATE_TODO_SET_GLOBAL'
export type UpdateTodoSetGlobal = {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  statusId: number
  imageUrl?: string
}
export const UPDATE_TODO_UNSET_GLOBAL = 'UPDATE_TODO_UNSET_GLOBAL'
export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST'
export type UpdateTodoRequest = {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  statusId: number
  imageUrl?: string
}
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS'
export type UpdateTodoSuccess = {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  statusId: number
  imageUrl?: string
}
export const UPDATE_TODO_FAIL = 'UPDATE_TODO_FAIL'

export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST'
export type DeleteTodoRequest = {
  todoId: number
  statusId: number
}
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'
export type DeleteTodoSuccess = {
  todoId: number
  statusId: number
}
export const DELETE_TODO_FAIL = 'DELETE_TODO_FAIL'

export const GET_ALL_TODO_REQUEST = 'GET_ALL_TODO_REQUEST'
export const GET_ALL_TODO_SUCCESS = 'GET_ALL_TODO_SUCCESS'
export type GetAllTodoSuccess = {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  statusId: number
  imageUrl?: string
}[]
export const GET_ALL_TODO_FAIL = 'GET_ALL_TODO_FAIL'

/** ** User ****/

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export type LoginUserRequest = {
  username: string
  password: string
}
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export type LoginUserSuccess = {
  token: string
  user: {
    id: number
    name: string
    username: string
    email: string
    levelAccess: number
    createdAt: Date
    updatedAt: Date
  }
}
export const LOGIN_USER_CREDENCIALS_WRONG = 'LOGIN_USER_CREDENCIALS_WRONG'
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL'

export const LOGOFF_USER_REQUEST = 'LOGOFF_USER_REQUEST'
export const LOGOFF_USER_SUCCESS = 'LOGOFF_USER_SUCCESS'
export const LOGOFF_USER_FAIL = 'LOGOFF_USER_FAIL'
