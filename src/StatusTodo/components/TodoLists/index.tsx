import TodoItem from '../TodoItem'
import {
  EmptyTodoItemList
} from './styles'

type StatusTodo = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

type Todo = {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  statusId: number
  imageUrl?: string
}

type Props = {
  todos: Todo[]
  statusTodo: StatusTodo
  afterDeleteTodoItem: (todoId: number) => void
  getTodoAfterUpdate: (todo: Todo) => void
  isLoading: boolean
}

/**
 * Renderiza todos Todo de um StatusTodo
 * @param props todos: lista de Todo de um StatusTodo
 * @returns returna a lista de renderizado um StatusTodo
 */
const TodoList = (props: Props) => {
  const renderTodoList = () =>
    <>
    {
      props.todos.map(todo => (
        <TodoItem
          key={todo.id}
          afterDelete={props.afterDeleteTodoItem}
          getTodoAfterUpdate={props.getTodoAfterUpdate}
          isLoading={props.isLoading}
          todo={todo}
          statusTodo={props.statusTodo}
        />
      ))
    }
    </>

  const renderEmptyTodoList = () =>
    <EmptyTodoItemList>
      Adicione um novo clicando no botão no topo da lista
    </EmptyTodoItemList>

  return props.todos.length === 0
    ? renderEmptyTodoList()
    : renderTodoList()
}

export default TodoList
