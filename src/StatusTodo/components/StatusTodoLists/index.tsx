import { useEffect, useState } from 'react'
import StatusTodoList from '../StatusTodoList'
import {
  EmptyStatusTodo
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

type StatusTodo = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  todos: Todo[]
}

type Props = {
  statusTodoLists: StatusTodo[]
  isLoading: boolean
  removeStatusTodoAfterRequest: (statusTodoId: number) => void
}

/**
 * Componente que renderiza todos status todo
 * @param props statusTodoLists: lista de todos status
 * @returns Se tiver carregando retorna um componente de loading
 * @returns Se não tiver dados, retorna uma mensagem que a lista está vazia
 * @returns Retorna um Status Todo com vários todos
 */
const StatusTodoLists = (props: Props) => {
  const [statusTodoLists, setStatusTodoLists] = useState<StatusTodo[]>([])

  useEffect(() => {
    setStatusTodoLists(props.statusTodoLists)
  }, [props.statusTodoLists])

  const getTodoAfterUpdated = (todo: Todo, statusTodoId: number) => {
    let newStatusTodoLists: StatusTodo[] = [...statusTodoLists]

    function _removeTodoItem () {
      newStatusTodoLists = statusTodoLists.map(statusTodoList => {
        statusTodoList.todos = statusTodoList.todos.filter(t => t.id !== todo.id)
        return statusTodoList
      })
    }

    function _addtodo () {
      newStatusTodoLists = statusTodoLists.map(statusTodoList => {
        if (statusTodoList.id === statusTodoId) {
          statusTodoList.todos.push(todo)
        }
        return statusTodoList
      })
    }

    _removeTodoItem()
    _addtodo()
    setStatusTodoLists(newStatusTodoLists)
  }

  if (props.isLoading) {
    return <EmptyStatusTodo>
    Carregando, aguarde.
  </EmptyStatusTodo>
  }

  // TODO: fazer um componente próprio em vez desse EmptyStatusTodo
  if (statusTodoLists.length === 0) {
    return <EmptyStatusTodo>
      Nenhum todo status adicionado ainda, cliquei no botão acima para iniciar um.
    </EmptyStatusTodo>
  }

  return <>
    {
      statusTodoLists.map(statusTodo => (
        <StatusTodoList
          getTodoAfterUpdated={getTodoAfterUpdated}
          removeStatusTodoAfterRequest={props.removeStatusTodoAfterRequest}
          key={statusTodo.id}
          statusTodo={statusTodo}
        />
      ))
    }
  </>
}

export default StatusTodoLists
