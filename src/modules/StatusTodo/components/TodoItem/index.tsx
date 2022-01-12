import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  Container,
  Title,
  Description,
  Image,
  Header,
  ButtonHeader
} from './styles'

import { IconDelete } from './icons'

import DeleteConfirmationDialog from './components/DeleteConfirmationDialog'
import UpdateTodoModal from './components/UpdateTodoModal'
import { deleteTodoRequest } from '../../../../store/actions/todo/todo'

type StatusTodo = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

type Todo = {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  statusId: number
  imageUrl?: string
}

type Props = {
  todo: Todo
  statusTodo: StatusTodo
  isLoading: boolean
}

const TodoItem = (props: Props) => {
  const [delTodoOpenDialog, setDelTodoOpenDialog] = useState(false)
  const [updateTodoOpenModal, setUpdateTodoOpenModal] = useState(false)

  const dispatch = useDispatch()

  const handleDeleteTodo = useCallback(() => {
    const payload = {
      statusId: props.statusTodo.id,
      todoId: props.todo.id
    }
    dispatch(deleteTodoRequest(payload))
  }, [])

  return (
    <Container>
      <Header>
        <Title onClick={() => setUpdateTodoOpenModal(true)}>
          {props.todo.title}
        </Title>
        <ButtonHeader
          disabled={props.isLoading}
          variant="contained"
          size="small"
          color="error"
          onClick={() => setDelTodoOpenDialog(true)}>
          <IconDelete />
        </ButtonHeader>
      </Header>
      <Description onClick={() => setUpdateTodoOpenModal(true)}>
        {props.todo.description}
      </Description>
      {
        props.todo.imageUrl && (
          <Image
            onClick={() => setUpdateTodoOpenModal(true)}
            src={props.todo.imageUrl}
          />
        )
      }
      <DeleteConfirmationDialog
        open={delTodoOpenDialog}
        onClose={() => setDelTodoOpenDialog(false)}
        onSubmit={handleDeleteTodo}
      />
      <UpdateTodoModal
        todo={props.todo}
        isLoading={props.isLoading}
        statusTodo={props.statusTodo}
        open={updateTodoOpenModal}
        onClose={() => setUpdateTodoOpenModal(false)}
      />
    </Container>
  )
}

export default TodoItem
