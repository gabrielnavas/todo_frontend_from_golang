type StatusTodoDto = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
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
  updatedAt: Date
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
      statusTodoListFinal.push({
        id: statusTodo.id,
        name: statusTodo.name,
        createdAt: statusTodo.createdAt,
        updatedAt: statusTodo.updatedAt,
        todos: todosFilter
      })
    }

    return statusTodoListFinal
  }

  return { handler }
}

export { useMergeStatusWithTodos }
