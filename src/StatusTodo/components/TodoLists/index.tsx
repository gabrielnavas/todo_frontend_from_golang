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
  isLoading: boolean
}

const TodoList = (props: Props) => {
  const renderTodoList = () =>
    <>
    {
      props.todos.map(todo => (
        <TodoItem
          key={todo.id}
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
