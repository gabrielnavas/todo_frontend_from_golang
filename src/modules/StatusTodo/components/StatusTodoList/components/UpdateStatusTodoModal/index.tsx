import { useCallback } from 'react'

import { useDispatch } from 'react-redux'

import Modal from '@mui/material/Modal'

import useForm from './hooks/useForm'

import {
  Container,
  TextFieldName,
  ButtonsStack,
  Button,
  Title,
  FormStack
} from './styles'
import { updateStatusTodoRequest } from '../../../../../../store/actions/todo/statusTodo'

type StatusTodo = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

type Props = {
  statusTodo: StatusTodo
  handleClose: () => void
  open: boolean
  isLoading: boolean
}

const UpdateStatusTodoModal = (props: Props) => {
  const form = useForm({ name: props.statusTodo.name })

  const dispatch = useDispatch()

  const handleUpdateStatusTodo = useCallback(async () => {
    const errors = await form.validate()
    const hasErrors = errors && Object.keys(errors).length > 0
    if (hasErrors) {
      return
    }

    dispatch(updateStatusTodoRequest({
      id: props.statusTodo.id,
      name: form.values.name
    }))
    props.handleClose()
  }, [form.values.name])

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
    >
      <Container>
        <Title variant="h6" >
          Atualizar novo status.
        </Title>
        <FormStack spacing={4}>
          <TextFieldName
            variant="standard"
            label="Nome"
            disabled={props.isLoading}
            error={!!form.errors.name}
            value={form.values.name}
            helperText={form.errors.name && form.errors.name}
            onChange={e => form.setValues(old => ({ ...old, name: e.target.value }))}
            onKeyPress={e => e.key === 'Enter' && handleUpdateStatusTodo()}
          />
          <ButtonsStack direction='row' spacing={4}>
            <Button
              color="error"
              disabled={props.isLoading}
              variant="contained"
              onClick={props.handleClose}>
                Cancelar
            </Button>
            <Button
              color='warning'
              disabled={props.isLoading}
              variant="contained"
              onClick={handleUpdateStatusTodo}>
                Atualizar
            </Button>
          </ButtonsStack>
        </FormStack>
      </Container>
    </Modal>
  )
}

export default UpdateStatusTodoModal
