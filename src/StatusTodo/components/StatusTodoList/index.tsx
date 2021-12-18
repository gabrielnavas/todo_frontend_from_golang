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
}

const StatusTodoList = (props: Props) => {
  return (
    <Container>
      <HeaderStack>
        <Title>
          {props.statusTodo.name}
        </Title>
        <ButtonsHeader>
          <ButtonHeader variant="contained" size="small">
            <IconAddTodo />
          </ButtonHeader>
          <ButtonHeader variant="contained" size="small" color="warning">
            <IconEditAddTodo />
          </ButtonHeader>
          <ButtonHeader variant="contained" size="small" color="error">
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
