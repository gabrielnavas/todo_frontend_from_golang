import Modal from '@mui/material/Modal'
import { useCallback, useState } from 'react'
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

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

type Props = {
  handleClose: () => void
  open: boolean
}

const AddTodoModal = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm()

  const handleCreateTodo = useCallback(async () => {
    try {
      setIsLoading(true)
      // TODO: request POST
      setIsLoading(false)
      // TODO: handler errors 400
    } catch (ex) {
      // TODO: handler error 500
    } finally {
      setIsLoading(false)
    }
  }, [])

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
          Insert novo status.
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
          {renderImageUpload}
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
