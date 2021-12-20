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
}

const StatusTodoList = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [toggleAddStatusTodoModal, setToggleAddStatusTodoModal] = useState(false)

  const utils = useUtils()
  const alerts = useAlert()
  
  const removeStatusTodo = useRemoveStatusTodo()

  const handleRemoveStatusTodo = useCallback(() => {
    async function _remove() {
      setIsLoading(true)
      const resultRequest = await removeStatusTodo.handle(props.statusTodo.id)
      const message =  utils.capitalizeWithEndDot(resultRequest.message)
      setIsLoading(false)
      if (resultRequest.ok) {
        props.removeStatusTodoAfterRequest(props.statusTodo.id)
        alerts.handle('success', message)
      } else {
        alerts.handle('warning', message)
      }
    }

    _remove()
      .then()
      .catch(() => alerts.handle('error', "Sistema fora do ar, tente novamente mais tarde"))
  }, [removeStatusTodo.handle,  alerts.handle])

  return (
    <Container>
      <HeaderStack>
        <Title>
          {props.statusTodo.name}
        </Title>
        <ButtonsHeader>
          <ButtonHeader 
            disabled={isLoading}
            variant="contained" 
            size="small"
            onClick={() => setToggleAddStatusTodoModal(true)}>
            <IconAddTodo />
          </ButtonHeader>
          <ButtonHeader 
            disabled={isLoading}
            variant="contained" 
            size="small" 
            color="warning">
            <IconEditAddTodo />
          </ButtonHeader>
          <ButtonHeader 
            disabled={isLoading}
            variant="contained" 
            size="small" 
            color="error"
            onClick={handleRemoveStatusTodo}>
            <IconRemoveAddTodo />
          </ButtonHeader>
        </ButtonsHeader>
      </HeaderStack>
      <Body>
        <TodoList todos={props.statusTodo.todos} isLoading={isLoading} />
      </Body>
      <AddTodoModal 
        handleClose={() => setToggleAddStatusTodoModal(false)}
        open={toggleAddStatusTodoModal}
      />
    </Container>
  )
}

export default StatusTodoList
