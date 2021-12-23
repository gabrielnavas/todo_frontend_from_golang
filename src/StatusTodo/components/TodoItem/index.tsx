import { useCallback, useState } from 'react'

import {
  Container,
  Title,
  Description,
  Image,
  Header,
  ButtonHeader
} from './styles'

import { IconDelete } from './icons'
import { useDeleteTodo } from './hooks/http/useDeleteTodo'
import { useAlert } from '../../../shared/hooks/alert/useAlert'
import DeleteConfirmationDialog from './hooks/components/DeleteConfirmationDialog'

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
  isLoading: boolean
  afterDelete: (todoId: number) => void
}

/**
 * Renderiza um simples todo
 * @param props todo: Todo é um simples todo
 * @returns um Todo Item
 */
const TodoItem = (props: Props) => {
  const [delTodoOpenDialog, setDelTodoOpenDialog] = useState(false)
  const [isLoading, setIsloading] = useState(false)
  const deleteTodo = useDeleteTodo()
  const alerts = useAlert()

  const handleTodoItem = useCallback(() => {
    console.log('voce clicou no titulo, descricao ou imagem do todo')
  }, [])

  const handleDeleteTodo = useCallback(async () => {
    setIsloading(true)
    try {
      const result = await deleteTodo.handler(props.todo.id)
      if (result.hasError) {
        alerts.handle('warning', result.message)
        return
      }
      alerts.handle('success', result.message)
      setDelTodoOpenDialog(false)
      props.afterDelete(props.todo.id)
      setIsloading(false)
    } catch (ex) {
      alerts.handle('error', 'Tente mais tarde, servidor fora do ar.')
      setIsloading(false)
    }
  }, [])

  const isLoadingAll = props.isLoading || isLoading

  return (
    <Container onClick={handleTodoItem}>
      <Header>
        <Title>
          {props.todo.title}
        </Title>
        <ButtonHeader
          disabled={isLoadingAll}
          variant="contained"
          size="small"
          color="error"
          onClick={() => setDelTodoOpenDialog(true)}>
          <IconDelete />
        </ButtonHeader>
      </Header>
      <Description>
        {props.todo.description}
      </Description>
      {
        props.todo.imageUrl && (
          <Image src={props.todo.imageUrl}/>
        )
      }
      <DeleteConfirmationDialog
        open={delTodoOpenDialog}
        onClose={() => setDelTodoOpenDialog(false)}
        onSubmit={handleDeleteTodo}
      />
    </Container>
  )
}

export default TodoItem
