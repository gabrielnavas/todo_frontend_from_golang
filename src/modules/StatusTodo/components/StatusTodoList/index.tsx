import { useCallback, useState } from 'react'

import { useDispatch } from 'react-redux'

import { deleteStatusTodoRequest } from '../../../../store/actions/todo/statusTodo'

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

import { useAlert } from '../../../../hooks/alert/useAlert'

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
  isLoading: boolean
}

const StatusTodoList = (props: Props) => {
  const [toggleAddTodoModal, setToggleAddTodoModal] = useState(false)
  const [toggleUpdateStatusTodoModal, setToggleUpdateStatusTodoModal] = useState(false)
  const [toggleRemoveStatusTodoModal, setToggleRemoveStatusTodoModal] = useState(false)

  const alerts = useAlert()

  const dispatch = useDispatch()

  const handleRemoveStatusTodo = useCallback(() => {
    if (props.statusTodo.todos.length > 0) {
      alerts.handle('warning', `Você precisa deletar todos Todos antes do status '${props.statusTodo.name}'.`)
      setToggleRemoveStatusTodoModal(false)
      return
    }
    dispatch(deleteStatusTodoRequest({ statusTodoId: props.statusTodo.id }))
    setToggleRemoveStatusTodoModal(false)
  }, [props.statusTodo])

  return (
    <Container>
      <HeaderStack>
        <Title>
          {props.statusTodo.name}
        </Title>
        <ButtonsHeader>
          <ButtonHeader
            disabled={props.isLoading}
            variant="contained"
            size="small"
            onClick={() => setToggleAddTodoModal(true)}>
            <IconAddTodo />
          </ButtonHeader>
          <ButtonHeader
            disabled={props.isLoading}
            variant="contained"
            size="small"
            color="warning"
            onClick={() => setToggleUpdateStatusTodoModal(true)}>
            <IconEditAddTodo />
          </ButtonHeader>
          <ButtonHeader
            disabled={props.isLoading}
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
          todos={props.statusTodo.todos}
          statusTodo={props.statusTodo}
          isLoading={props.isLoading}
        />
      </Body>
      <AddTodoModal
        isLoading={props.isLoading}
        statusTodo={props.statusTodo}
        handleClose={() => setToggleAddTodoModal(false)}
        open={toggleAddTodoModal}
      />
      <UpdateStatusTodoModal
        isLoading={props.isLoading}
        statusTodo={props.statusTodo}
        open={toggleUpdateStatusTodoModal}
        handleClose={() => setToggleUpdateStatusTodoModal(false)}
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
