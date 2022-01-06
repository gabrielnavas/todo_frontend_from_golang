import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllStatusTodoRequest } from '../../../store/actions/todo/statusTodo'
import { getAllTodoRequest } from '../../../store/actions/todo/todo'
import { Reducers } from '../../../store/reducers'

import StatusTodoList from '../StatusTodoList'

import {
  EmptyStatusTodo
} from './styles'

type Props = {
  isLoading: boolean
}

const StatusTodoLists = (props: Props) => {
  const store = useSelector<Reducers, Reducers>(state => state)
  const dispatch = useDispatch()

  dispatch(getAllStatusTodoRequest())
  // dispatch(getAllTodoRequest())

  if (props.isLoading) {
    return <EmptyStatusTodo>
      Carregando, aguarde.
    </EmptyStatusTodo>
  }

  // TODO: fazer um componente próprio em vez desse EmptyStatusTodo
  if (store.statusTodoStore.statusTodos.length === 0) {
    return <EmptyStatusTodo>
      Nenhum todo status adicionado ainda, cliquei no botão acima para iniciar um.
    </EmptyStatusTodo>
  }

  return <>
    {
      store.statusTodoStore.statusTodos.map(statusTodo => (
        <StatusTodoList
          key={statusTodo.id}
          isLoading={props.isLoading}
          statusTodo={statusTodo}
        />
      ))
    }
  </>
}

export default StatusTodoLists
