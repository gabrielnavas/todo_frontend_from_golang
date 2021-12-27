import { useCallback, useState } from 'react'

import TodoList from '../TodoLists'

import {
  Container,
  HeaderStack,
  ButtonsHeader,
  Title,
  ButtonHeader,
  Body
} from './styles'

import {
  IconAddTodo,
  IconEditAddTodo,
  IconRemoveAddTodo
} from './icons'
import { useAlert } from '../../../shared/hooks/alert/useAlert'
import { useRemoveStatusTodo } from './hooks/useRemoveStatusTodo'
import { useUtils } from '../../../shared/hooks/utils/useUtils'
import AddTodoModal from './components/AddTodoModal'
import UpdateStatusTodoModal from './components/UpdateStatusTodoModal'
import RemoveStatusTodoDialog from './components/RemoveStatusTodoDialog'

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
  statusTodo: StatusTodo
  removeStatusTodoAfterRequest: (statusTodoId: number) => void
  getTodoAfterUpdated: (todo: Todo, statusTodoId: number) => void
}

const StatusTodoList = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [toggleAddTodoModal, setToggleAddTodoModal] = useState(false)
  const [toggleUpdateStatusTodoModal, setToggleUpdateStatusTodoModal] = useState(false)
  const [toggleRemoveStatusTodoModal, setToggleRemoveStatusTodoModal] = useState(false)
  const [statusTodo, setStatusTodo] = useState<StatusTodo>(props.statusTodo)

  const utils = useUtils()
  const alerts = useAlert()

  const removeStatusTodo = useRemoveStatusTodo()

  const handleRemoveStatusTodo = useCallback(() => {
    async function _remove () {
      setIsLoading(true)
      const resultRequest = await removeStatusTodo.handle(statusTodo.id)
      const message = utils.capitalizeWithEndDot(resultRequest.message)
      setIsLoading(false)
      if (resultRequest.ok) {
        props.removeStatusTodoAfterRequest(statusTodo.id)
        alerts.handle('success', message)
      } else {
        alerts.handle('warning', message)
      }
    }

    _remove()
      .then()
      .catch(() => alerts.handle('error', 'Sistema fora do ar, tente novamente mais tarde'))
      .finally(() => setToggleRemoveStatusTodoModal(false))
  }, [removeStatusTodo.handle, alerts.handle])

  const handleGetTodoAfterAdd = useCallback((todo: Todo) => {
    setStatusTodo(old => ({ ...old, todos: [todo, ...old.todos] }))
  }, [statusTodo.todos])

  const handlerAfterDeleteTodoItem = useCallback((todoId: number) => {
    setStatusTodo(old => ({ ...old, todos: old.todos.filter(todo => todo.id !== todoId) }))
  }, [])

  const getStatusTodoAfterUpdated = (statusTodo: StatusTodo) => {
    setStatusTodo(statusTodo)
  }

  return (
    <Container>
      <HeaderStack>
        <Title>
          {statusTodo.name}
        </Title>
        <ButtonsHeader>
          <ButtonHeader
            disabled={isLoading}
            variant="contained"
            size="small"
            onClick={() => setToggleAddTodoModal(true)}>
            <IconAddTodo />
          </ButtonHeader>
          <ButtonHeader
            disabled={isLoading}
            variant="contained"
            size="small"
            color="warning"
            onClick={() => setToggleUpdateStatusTodoModal(true)}>
            <IconEditAddTodo />
          </ButtonHeader>
          <ButtonHeader
            disabled={isLoading}
            variant="contained"
            size="small"
            color="error"
            onClick={() => setToggleRemoveStatusTodoModal(true)}>
            <IconRemoveAddTodo />
          </ButtonHeader>
        </ButtonsHeader>
      </HeaderStack>
      <Body>
        <TodoList
          todos={statusTodo.todos}
          statusTodo={props.statusTodo}
          afterDeleteTodoItem={handlerAfterDeleteTodoItem}
          getTodoAfterUpdate={props.getTodoAfterUpdated}
          isLoading={isLoading}
        />
      </Body>
      <AddTodoModal
        statusTodo={statusTodo}
        getTodoAfterAdd={handleGetTodoAfterAdd}
        handleClose={() => setToggleAddTodoModal(false)}
        open={toggleAddTodoModal}
      />
      <UpdateStatusTodoModal
        statusTodo={statusTodo}
        open={toggleUpdateStatusTodoModal}
        handleClose={() => setToggleUpdateStatusTodoModal(false)}
        getStatusTodoAfterUpdated={getStatusTodoAfterUpdated}
      />
      <RemoveStatusTodoDialog
        open={toggleRemoveStatusTodoModal}
        handleClose={() => setToggleRemoveStatusTodoModal(false)}
        handleOnSubmit={handleRemoveStatusTodo}
      />
    </Container>
  )
}

export default StatusTodoList
