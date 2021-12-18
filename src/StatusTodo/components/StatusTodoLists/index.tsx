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
}

/**
 * Componente que renderiza todos status todo
 * @param props statusTodoLists: lista de todos status
 * @returns Se tiver carregando retorna um componente de loading
 * @returns Se não tiver dados, retorna uma mensagem que a lista está vazia
 * @returns Retorna um Status Todo com vários todos
 */
const StatusTodoLists = (props: Props) => {
  // TODO: refatorar esses nomes grandes(talvez?)

  if (props.isLoading) {
    return <EmptyStatusTodo>
    Carregando, aguarde.
  </EmptyStatusTodo>
  }

  // TODO: fazer um componente próprio em vez desse EmptyStatusTodo
  if (props.statusTodoLists.length === 0) {
    return <EmptyStatusTodo>
    Nenhum todo status adicionado ainda, cliquei no botão acima para iniciar um.
  </EmptyStatusTodo>
  }

  return <>
    {
      props.statusTodoLists.map(statusTodo => (
        <StatusTodoList
          key={statusTodo.id}
          statusTodo={statusTodo}
        />
      ))
    }
  </>
}

export default StatusTodoLists
