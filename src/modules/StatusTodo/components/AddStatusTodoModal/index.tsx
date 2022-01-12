import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import Modal from '@mui/material/Modal'

import { addStatusTodoRequest } from '../../../../store/actions/todo/statusTodo'

import useForm from './hooks/useForm'

import {
  Container,
  TextFieldName,
  ButtonsStack,
  Button,
  Title,
  FormStack
} from './styles'

type Props = {
  handleClose: () => void
  open: boolean
  isLoading: boolean
}

const AddStatusTodoModal = (props: Props) => {
  const form = useForm()

  const dispatch = useDispatch()

  const handleCreateStatusTodo = useCallback(async () => {
    const errors = await form.validate()
    const hasErrors = errors && Object.keys(errors).length > 0
    if (hasErrors) {
      return
    }
    const payload = {
      name: form.values.name
    }
    dispatch(addStatusTodoRequest(payload))
    form.resetForm()
  }, [form.values])

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
    >
      <Container>
        <Title variant="h6" >
          Adicionar novo status.
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
            onKeyPress={e => e.key === 'Enter' && handleCreateStatusTodo()}
          />
          <ButtonsStack direction='row' spacing={4}>
            <Button
              disabled={props.isLoading}
              variant="contained"
              color="error"
              onClick={props.handleClose}>
                Cancelar
            </Button>
            <Button
              disabled={props.isLoading}
              variant="contained"
              onClick={handleCreateStatusTodo}>
                Inserir
            </Button>
          </ButtonsStack>
        </FormStack>
      </Container>
    </Modal>
  )
}

export default AddStatusTodoModal
