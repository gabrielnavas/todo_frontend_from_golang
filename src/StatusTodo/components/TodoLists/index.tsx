import { useCallback, useState } from 'react'
import TodoItem from '../TodoItem'
import {
  EmptyTodoItemList
} from './styles'

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
  isLoading: boolean
}

/**
 * Renderiza todos Todo de um StatusTodo
 * @param props todos: lista de Todo de um StatusTodo
 * @returns returna a lista de renderizado um StatusTodo
 */
const TodoList = (props: Props) => {
  const [todos, setTodos] = useState(props.todos)

  const handlerAfterDeleteTodoItem = useCallback((todoId: number) => {
    setTodos(old => old.filter(todo => todo.id !== todoId))
  }, [])

  const renderTodoList = () =>
    <>
    {
      todos.map(todo => (
        <TodoItem
          key={todo.id}
          afterDelete={handlerAfterDeleteTodoItem}
          isLoading={props.isLoading}
          todo={todo} />
      ))
    }
    </>

  const renderEmptyTodoList = () =>
    <EmptyTodoItemList>
      Adicione um novo clicando no botão no topo da lista
    </EmptyTodoItemList>

  return todos.length === 0
    ? renderEmptyTodoList()
    : renderTodoList()
}

export default TodoList
