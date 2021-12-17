import { useEffect, useState } from 'react'

import {
  Page,
  Container,
  Paper,
  Header,
  Title,
  ButtonAddStatusTodo,
  BodyStack
} from './styles'

import { IconAddStatusTodo } from './icons'
import StatusTodoLists from '../components/StatusTodoLists'

import { useGetStatusTodoList } from '../hooks/http/useGetStatusTodoList'
import { useGetTodoList } from '../hooks/http/useGetTodoList'

import { useMergeStatusWithTodos } from '../hooks/ui/useMergeStatusWithTodos'

// TODO: declarar a imagem como opicional no type
type Todo = {
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
  todos: Todo[]
}

const StatusTodoView = () => {
  const [statusTodo, setStatusTodo] = useState<StatusTodo[]>([])

  const statusTodoList = useGetStatusTodoList()
  const todoList = useGetTodoList()
  const mergeStatusWithTodos = useMergeStatusWithTodos()

  useEffect(() => {
    async function _fetchData () {
      const statusTodosData = await statusTodoList.handler()
      const todosData = await todoList.handler()
      const statusTodosMerged = mergeStatusWithTodos.handler(statusTodosData, todosData)
      setStatusTodo(statusTodosMerged)
    }

    // TODO: usar toastify para mostrar mensagens aqui
    _fetchData().then().catch(() => console.log('Xii, servidor offline, tente novamente mais tarde.'))
  }, [])

  const isLoading = statusTodoList.isLoading || todoList.isLoading

  return (
    <Page>
      <Container>
        <Paper>
          <Header>
            <Title>Todo App</Title>
            <ButtonAddStatusTodo variant="contained" size="small">
              <IconAddStatusTodo />
            </ButtonAddStatusTodo>
          </Header>
          <BodyStack direction='row'>
            <StatusTodoLists statusTodoLists={statusTodo} isLoading={isLoading} />
          </BodyStack>
        </Paper>
      </Container>
    </Page>
  )
}

export default StatusTodoView
