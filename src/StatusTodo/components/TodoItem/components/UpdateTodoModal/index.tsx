import { useCallback, useState } from 'react'

import Modal from '@mui/material/Modal'

import { useForm } from './hooks/data/useForm'
import { useUpdateTodo } from './hooks/http/useUpdateTodo'

import {
  Container,
  TextFieldTitle,
  TextFieldDescription,
  ImageTodo,
  ButtonsStack,
  ButtonFileUpload,
  FileUploadContainer,
  StackFileUploadButtons,
  ButtonFinish,
  Title,
  FormStack
} from './styles'

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { useAlert } from '../../../../../shared/hooks/alert/useAlert'

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
}

type Props = {
  todo: Todo
  statusTodo: StatusTodo
  getTodoAfterUpdate: (todo: Todo) => void
  onClose: () => void
  open: boolean
}

const UpdateTodoModal = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({ todo: props.todo })
  const updateTodo = useUpdateTodo()
  const alerts = useAlert()

  const handleUpdateTodo = useCallback(async () => {
    const errors = await form.validate()
    const errorsList = Object.keys(errors)
    if (errorsList.length > 0) {
      return
    }

    setIsLoading(true)
    try {
      const result = await updateTodo.handler({
        id: props.todo.id,
        title: form.values.title,
        description: form.values.description,
        imageUrl: form.values.imageUrl,
        statusId: props.statusTodo.id,
        createdAt: props.todo.createdAt,
        updatedAt: props.todo.updatedAt
      })
      if (result.hasError) {
        alerts.handle('warning', result.message)
        return
      }
      alerts.handle('success', result.message)
      props.getTodoAfterUpdate(result.todo)
      props.onClose()
    } catch (ex) {
      console.log(ex)

      alerts.handle('error', 'Ocorreu um problema com o servidor, tente adicionar mais tarde.')
    } finally {
      setIsLoading(false)
    }
  }, [form.values])

  const renderImageUpload = () => {
    return (
      <FileUploadContainer>
        <input
          onChange={() => form.onChangeImage()}
          type="file"
          hidden
          ref={form.fileRef}
        />
        <StackFileUploadButtons>
          {
            form.values.imageUrl && (
              <ButtonFileUpload
                color="error"
                onClick={() => form.onClickRemoveImage()}>
                <PhotoCameraIcon />
                {' Remover imagem'}
              </ButtonFileUpload>
            )
          }
          <ButtonFileUpload
            color="info"
            onClick={() => form.fileRef.current.click()}>
            <PhotoCameraIcon />
            {form.values.imageUrl ? ' Alterar a imagem' : ' Selecione uma imagem'}
          </ButtonFileUpload>
        </StackFileUploadButtons>
        {
          form.values.imageUrl &&
            <ImageTodo src={form.values.imageUrl} />
        }
      </FileUploadContainer>
    )
  }

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <Container>
        <Title variant="h6" >
          Atualizar Todo
        </Title>
        <FormStack spacing={4}>
          <TextFieldTitle
            variant="standard"
            label="Título"
            disabled={isLoading}
            error={!!form.errors.title}
            value={form.values.title}
            helperText={form.errors.title && form.errors.title}
            onChange={e => form.setValues(old => ({ ...old, title: e.target.value }))}
            onKeyPress={e => e.key === 'Enter' && handleUpdateTodo()}
          />
          <TextFieldDescription
            label="Descrição"
            multiline
            rows={4}
            error={!!form.errors.description}
            value={form.values.description}
            helperText={form.errors.description && form.errors.description}
            onChange={e => form.setValues(old => ({ ...old, description: e.target.value }))}
            onKeyPress={e => e.key === 'Enter' && handleUpdateTodo()}
          />
          {renderImageUpload()}
          <ButtonsStack direction='row' spacing={4}>
            <ButtonFinish
              disabled={isLoading}
              variant="contained"
              color="error"
              onClick={props.onClose}>
                Cancelar
            </ButtonFinish>
            <ButtonFinish
              disabled={isLoading}
              variant="contained"
              onClick={handleUpdateTodo}>
                Atualizar
            </ButtonFinish>
          </ButtonsStack>
        </FormStack>
      </Container>
    </Modal>
  )
}

export default UpdateTodoModal
