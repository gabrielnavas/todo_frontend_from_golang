import { useCallback } from 'react'

import { useDispatch } from 'react-redux'

import { addTodoRequest } from '../../../../../store/actions/todo/todo'

import Modal from '@mui/material/Modal'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

import { useForm } from './hooks/useForm'

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

type StatusTodo = {
  id: number
  name: string
}

type Props = {
  statusTodo: StatusTodo
  handleClose: () => void
  open: boolean
  isLoading: boolean
}

const AddTodoModal = (props: Props) => {
  const form = useForm()

  const dispatch = useDispatch()

  const handleCreateTodo = useCallback(async () => {
    const errors = await form.validate()
    const errorsList = Object.entries(errors)
    if (errorsList.length > 0) {
      return
    }
    const payload = {
      title: form.values.title,
      image: form.values.image,
      description: form.values.description,
      statusId: props.statusTodo.id
    }
    dispatch(addTodoRequest(payload))
    form.resertForm()
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
            disabled={props.isLoading}
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
              disabled={props.isLoading}
              variant="contained"
              color="error"
              onClick={props.handleClose}>
                Cancelar
            </ButtonFinish>
            <ButtonFinish
              disabled={props.isLoading}
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
