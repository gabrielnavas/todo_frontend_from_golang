import TodoItem from '../TodoItem'
import {
  EmptyTodoItemList
} from './styles'

type Todo = {
  id: number
  title: string
  description: string
  image: string
}

type Props = {
  todos: Todo[]
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
        <TodoItem key={todo.id} todo={todo} />
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
