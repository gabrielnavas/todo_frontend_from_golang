import { useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { updateTodoRequest } from '../../../../../store/actions/todo/todo'
import { Reducers } from '../../../../../store/reducers'

import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

import { useForm } from './hooks/data/useForm'

import {
  Container,
  TextFieldTitle,
  TextFieldDescription,
  ImageTodo,
  ButtonsStack,
  ButtonFileUpload,
  FileUploadContainer,
  StackFileUploadButtons,
  SelectStatusTodo,
  ButtonFinish,
  Title,
  FormStack
} from './styles'

type Todo = {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  statusId: number
  imageUrl?: string
}

export type StatusTodo = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export type StatusTodoOptions = {
  label: string
  statusTodo: StatusTodo
}

type Props = {
  todo: Todo
  statusTodo: StatusTodo
  onClose: () => void
  open: boolean
  isLoading: boolean
}

const UpdateTodoModal = (props: Props) => {
  const [statusTodoOptions, setStatusTodoOptions] = useState<StatusTodoOptions[]>([])

  const store = useSelector<Reducers, Reducers>(state => state)
  const dispatch = useDispatch()

  const form = useForm({ todo: props.todo })

  useEffect(() => {
    const statusTodoOptions = store.statusTodoStore.statusTodos.map(statusTodo => ({ label: statusTodo.name, statusTodo }))
    setStatusTodoOptions(statusTodoOptions)
  }, [])

  const handleUpdateTodo = useCallback(async () => {
    const errors = await form.validate()
    const errorsList = Object.keys(errors)
    if (errorsList.length > 0) {
      return
    }

    const payload = {
      id: props.todo.id,
      title: form.values.title,
      description: form.values.description,
      imageUrl: form.values.imageUrl,
      statusId: form.values.statusId,
      createdAt: props.todo.createdAt,
      updatedAt: props.todo.updatedAt
    }
    dispatch(updateTodoRequest(payload))
    props.onClose()
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
                  {/* // TODO: MUDAR PARA ICONE DE REMOVER FOTO OU ALGO DO TIPO */}
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
            disabled={props.isLoading}
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
          <SelectStatusTodo
            options={statusTodoOptions}
            onChange={(e: any, value: StatusTodoOptions) => form.setValues(old => ({ ...old, statusId: value.statusTodo.id }))}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Mover para Status" />}
          />
          {renderImageUpload()}
          <ButtonsStack direction='row' spacing={4}>
            <ButtonFinish
              disabled={props.isLoading}
              variant="contained"
              color="error"
              onClick={props.onClose}>
                Cancelar
            </ButtonFinish>
            <ButtonFinish
              disabled={props.isLoading}
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
