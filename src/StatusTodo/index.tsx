import { useCallback, useEffect, useState } from 'react'

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
import StatusTodoLists from './components/StatusTodoLists'

import { useGetStatusTodoList } from './hooks/http/useGetStatusTodoList'
import { useGetTodoList } from './hooks/http/useGetTodoList'

import { useMergeStatusWithTodos } from './hooks/data/useMergeStatusWithTodos'
import { useAlert } from '../shared/hooks/alert/useAlert'
import AddStatusTodoModal from './components/AddStatusTodoModal'

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

const StatusTodoView = () => {
  const [statusTodo, setStatusTodo] = useState<StatusTodo[]>([])
  const [toggleAddStatusTodoModal, setToggleAddStatusTodoModal] = useState(false)

  const alert = useAlert()

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

    _fetchData()
      .then()
      .catch(() => alert.handle('error', 'Xii, servidor offline, tente novamente mais tarde.'))
  }, [])

  const insertIntoStatusTodoCallback = useCallback((statusTodo: Omit<StatusTodo, 'todos'>) => {
    const newStatusTodo: StatusTodo = {
      ...statusTodo,
      todos: []
    }
    setStatusTodo(old => [newStatusTodo, ...old])
    setToggleAddStatusTodoModal(false)
  }, [])

  const removeStatusTodoAfterRequest = useCallback((statusTodoId: number): void => {
    setStatusTodo(old => old.filter(item => item.id !== statusTodoId))
  }, [])

  const isLoading = statusTodoList.isLoading || todoList.isLoading

  return (
    <Page>
      <Container>
        <Paper>
          <Header>
            <Title>Todo App</Title>
            <ButtonAddStatusTodo
              variant="contained"
              size="small"
              onClick={() => setToggleAddStatusTodoModal(true)}>
              <IconAddStatusTodo />
            </ButtonAddStatusTodo>
          </Header>
          <BodyStack direction='row'>
            <StatusTodoLists
              removeStatusTodoAfterRequest={removeStatusTodoAfterRequest}
              statusTodoLists={statusTodo}
              isLoading={isLoading} />
          </BodyStack>
        </Paper>
      </Container>
      <AddStatusTodoModal
        getStatusTodoCreated={insertIntoStatusTodoCallback}
        open={toggleAddStatusTodoModal}
        handleClose={() => setToggleAddStatusTodoModal(false)} />
    </Page>
  )
}

export default StatusTodoView