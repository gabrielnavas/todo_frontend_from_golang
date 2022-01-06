import { combineReducers } from 'redux'

import statusTodoReducer from './todo/switch'
import { StateStatusTodo } from './todo/todoTypes'

export type Reducers = {
  statusTodoStore: StateStatusTodo
}

export default combineReducers<Reducers>({
  statusTodoStore: statusTodoReducer
})
