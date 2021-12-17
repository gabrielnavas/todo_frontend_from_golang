type StatusTodoDto = {
  id: number
  name: string
  createdAt: Date
  updateAt: Date
}

type TodoDto = {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  statusId: number
}

type StatusTodo = {
  id: number
  name: string
  createdAt: Date
  updateAt: Date
  todos: TodoDto[]
}

const useMergeStatusWithTodos = () => {
  const getAllTodoByStatusTodoId = (todos: TodoDto[], statusTodoId: number) => {
    return todos.filter(todo => todo.statusId === statusTodoId)
  }

  const handler = (statusTodosList: StatusTodoDto[], todosList: TodoDto[]): StatusTodo[] => {
    const statusTodoListFinal: StatusTodo[] = []

    for (const statusTodo of statusTodosList) {
      const todosFilter: TodoDto[] = getAllTodoByStatusTodoId(todosList, statusTodo.id)
      const statusTodoFinal = {
        ...statusTodo,
        todos: todosFilter
      }
      statusTodoListFinal.push(statusTodoFinal)
    }

    return statusTodoListFinal
  }

  return { handler }
}

export { useMergeStatusWithTodos }
