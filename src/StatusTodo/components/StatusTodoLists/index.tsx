import StatusTodoList from '../StatusTodoList'
import {
  EmptyStatusTodo
} from './styles'

type Todo = {
  id: number
  title: string
  description: string
  image: string
}

type StatusTodo = {
  id: number
  name: string
  todos: Todo[]
}

type Props = {
  statusTodoLists: StatusTodo[]
}

/**
 * Componente que renderiza todos status todo
 * @param props statusTodoLists: lista de todos status
 * @returns returna o component renderizado com todos status todo e seus todos dentro
 */
const StatusTodoLists = (props: Props) => {
  const renderStatusTodoList = () => (
    <>
    {
      props.statusTodoLists.map(statusTodo => (
        <StatusTodoList
          key={statusTodo.id}
          statusTodo={statusTodo}
        />
      ))
    }
    </>
  )

  const renderEmptyStatusTodoList = () => (
    <EmptyStatusTodo>
      Nenhum todo status adicionado ainda, cliquei no botão acima para iniciar um.
    </EmptyStatusTodo>
  )

  return props.statusTodoLists.length === 0
    ? renderEmptyStatusTodoList()
    : renderStatusTodoList()
}

export default StatusTodoLists
