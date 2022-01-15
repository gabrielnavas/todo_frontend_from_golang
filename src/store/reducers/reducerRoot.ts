import { combineReducers } from 'redux'

import statusTodoReducer from './todo/switch'
import { StateStatusTodo } from './todo/todoTypes'

import userReducer, { StateUser } from './user/switch'

import messageReducer, { StateMessage } from './messages/switch'

export type Reducers = {
  statusTodoStore: StateStatusTodo
  userStore: StateUser
  messagesStore: StateMessage
}

export default combineReducers<Reducers>({
  statusTodoStore: statusTodoReducer,
  userStore: userReducer,
  messagesStore: messageReducer
})
