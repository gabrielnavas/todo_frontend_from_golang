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
import { useCallback } from 'react'
import { useApi } from '../../../shared/hooks/api/useApi'
import { useAlert } from '../../../shared/hooks/alert/useAlert'

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

  const api = useApi()
  const alerts = useAlert()

  // TODO: ADicionar handleRemoveStatusTodo em um hook
  const handleRemoveStatusTodo = useCallback(() => {
    (async () => {
      const response = await fetch(`${api.getEndpoint()}/todos/status/${props.statusTodo.id}`, {
        method: "DELETE"
      })

      if (response.status === 204) {
        props.removeStatusTodoAfterRequest(props.statusTodo.id)
        alerts.handle('success', 'status todo removido')
        return
      }

      if (response.status === 400) {
        const data = await response.json()
        alerts.handle('warning', data.message)
        return
      }
    })()
  }, [])
  
  return (
    <Container>
      <HeaderStack>
        <Title>
          {props.statusTodo.name}
        </Title>
        <ButtonsHeader>
          <ButtonHeader 
            variant="contained" 
            size="small">
            <IconAddTodo />
          </ButtonHeader>
          <ButtonHeader 
            variant="contained" 
            size="small" 
            color="warning">
            <IconEditAddTodo />
          </ButtonHeader>
          <ButtonHeader 
            variant="contained" 
            size="small" 
            color="error"
            onClick={handleRemoveStatusTodo}>
            <IconRemoveAddTodo />
          </ButtonHeader>
        </ButtonsHeader>
      </HeaderStack>
      <Body>
        <TodoList todos={props.statusTodo.todos} />
      </Body>
    </Container>
  )
}

export default StatusTodoList
