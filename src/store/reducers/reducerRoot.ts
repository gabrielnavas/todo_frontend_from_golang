import { combineReducers } from 'redux'

import statusTodoReducer from './todo/switch'
import { StateStatusTodo } from './todo/todoTypes'

import userReducer, { StateUser } from './user/switch'

export type Reducers = {
  statusTodoStore: StateStatusTodo
  userStore: StateUser
}

export default combineReducers<Reducers>({
  statusTodoStore: statusTodoReducer,
  userStore: userReducer
})
