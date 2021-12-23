import { useCallback, useState } from 'react'

import Modal from '@mui/material/Modal'

import { useForm } from './hooks/data/useForm'
import { useAddTodo } from './hooks/http/useAddTodo'

import {
  Container,
  TextFieldTitle,
  TextFieldDescription,
  ButtonsStack,
  ButtonFileUpload,
  FileUploadContainer,
  StackFileUploadButtons,
  TitleFileUpload,
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
}

type Props = {
  statusTodo: StatusTodo
  getTodoAfterAdd: (todo: Todo) => void
  handleClose: () => void
  open: boolean
}

const AddTodoModal = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm()
  const addTodo = useAddTodo()
  const alerts = useAlert()

  const handleCreateTodo = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await addTodo.handler({
        title: form.values.title,
        description: form.values.description,
        image: form.values.image,
        statusId: props.statusTodo.id
      })
      if (result.hasError) {
        alerts.handle('warning', result.message)
        return
      }
      alerts.handle('success', result.message)
      props.getTodoAfterAdd(result.todo)
    } catch (ex) {
      alerts.handle('success', 'Ocorreu um problema com o servidor, tente adicionar mais tarde.')
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
            form.values.image
              ? (
              <ButtonFileUpload
                color="error"
                onClick={() => form.onClickRemoveImage()}>
                <PhotoCameraIcon />
                {' Remover imagem'}
              </ButtonFileUpload>
                )
              : (
              <ButtonFileUpload
                color="info"
                onClick={() => form.fileRef.current.click()}>
                <PhotoCameraIcon />
                {' Selecione uma imagem'}
              </ButtonFileUpload>
                )
          }
        </StackFileUploadButtons>
        <TitleFileUpload>
        {
          form.values.image && `${form.values.image.name} `
        }
        </TitleFileUpload>
      </FileUploadContainer>
    )
  }

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
    >
      <Container>
        <Title variant="h6" >
          Novo todo.
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
            onKeyPress={e => e.key === 'Enter' && handleCreateTodo()}
          />
          <TextFieldDescription
            label="Descrição"
            multiline
            rows={4}
            error={!!form.errors.description}
            value={form.values.description}
            helperText={form.errors.description && form.errors.description}
            onChange={e => form.setValues(old => ({ ...old, description: e.target.value }))}
            onKeyPress={e => e.key === 'Enter' && handleCreateTodo()}
          />
          {renderImageUpload()}
          <ButtonsStack direction='row' spacing={4}>
            <ButtonFinish
              disabled={isLoading}
              variant="contained"
              color="error"
              onClick={props.handleClose}>
                Cancelar
            </ButtonFinish>
            <ButtonFinish
              disabled={isLoading}
              variant="contained"
              onClick={handleCreateTodo}>
                Inserir
            </ButtonFinish>
          </ButtonsStack>
        </FormStack>
      </Container>
    </Modal>
  )
}

export default AddTodoModal
