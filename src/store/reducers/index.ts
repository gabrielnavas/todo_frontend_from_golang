import { combineReducers } from 'redux'

import statusTodoReducer, { StateStatusTodo } from './todos/statusTodo'

export type Reducers = {
  statusTodoStore: StateStatusTodo
}

export default combineReducers<Reducers>({
  statusTodoStore: statusTodoReducer
})
