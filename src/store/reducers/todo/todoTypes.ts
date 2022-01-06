import * as actionTypes from '../../actions/actionTypes'

export type Todo = {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  statusId: number
  imageUrl?: string
}

export type StatusTodo = {
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
