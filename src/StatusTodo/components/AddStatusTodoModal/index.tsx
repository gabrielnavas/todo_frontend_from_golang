import { useCallback, useState } from 'react'

import Modal from '@mui/material/Modal'

import { useCreateStatusTodo } from './hooks/http/useCreateStatusTodo'
import useForm from './hooks/data/useForm'

import { useAlert } from '../../../shared/hooks/alert/useAlert'
import { useUtils } from '../../../shared/hooks/utils/useUtils'

import {
  Container,
  TextFieldName,
  ButtonsStack,
  Button,
  Title,
  FormStack
} from './styles'

type StatusTodo = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

type Props = {
  getStatusTodoCreated: (statusTodo: StatusTodo) => void
  handleClose: () => void
  open: boolean
}

const AddStatusTodoModal = (props: Props) => {
  const alerts = useAlert()
  const [isLoading, setIsLoading] = useState(false)
  const createStatusTodo = useCreateStatusTodo()
  const form = useForm()
  const utils = useUtils()

  const handleCreateStatusTodo = useCallback(async () => {
    const errors = await form.validate()
    const hasErrors = errors && Object.keys(errors).length > 0
    if (hasErrors) {
      return
    }
    setIsLoading(true)
    try {
      const statusTodoCreated = await createStatusTodo.handlerRequest(form.values)
      if (statusTodoCreated.messageError) {
        alerts.handle('warning', utils.capitalize(statusTodoCreated.messageError))
        return
      }
      props.getStatusTodoCreated({
        id: statusTodoCreated.id,
        name: statusTodoCreated.name,
        createdAt: statusTodoCreated.createdAt,
        updatedAt: statusTodoCreated.updatedAt
      })
      form.setValues(old => ({ ...old, name: '' }))
      alerts.handle('success', 'Status criado com success!')
    } catch (ex) {
      console.log(ex)
      alerts.handle('error', 'Não foi possível criar o status, tente novamente mais tarde')
    } finally {
      setIsLoading(false)
    }
  }, [form.values, createStatusTodo.handlerRequest])

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
          <TextFieldName
            variant="standard"
            label="Nome"
            disabled={isLoading}
            error={!!form.errors.name}
            value={form.values.name}
            helperText={form.errors.name && form.errors.name}
            onChange={e => form.setValues(old => ({ ...old, name: e.target.value }))}
            onKeyPress={e => e.key === 'Enter' && handleCreateStatusTodo()}
          />
          <ButtonsStack direction='row' spacing={4}>
            <Button
              disabled={isLoading}
              variant="contained"
              color="error"
              onClick={props.handleClose}>
                Cancelar
            </Button>
            <Button
              disabled={isLoading}
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
