import { useCallback, useEffect, useState } from 'react'

import Modal from '@mui/material/Modal'

import { useUpdateStatusTodo } from './hooks/http/useUpdateStatusTodo'
import useForm from './hooks/data/useForm'

import { useAlert } from '../../../../../shared/hooks/alert/useAlert'
import { useUtils } from '../../../../../shared/hooks/utils/useUtils'

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
  statusTodo: StatusTodo
  getStatusTodoAfterUpdated: (statusTodo: StatusTodo) => void
  handleClose: () => void
  open: boolean
}

const UpdateStatusTodoModal = (props: Props) => {
  const alerts = useAlert()
  const [isLoading, setIsLoading] = useState(false)
  const updateStatusTodo = useUpdateStatusTodo()
  const form = useForm()
  const utils = useUtils()

  useEffect(() => {
    form.setValues({
      id: props.statusTodo.id,
      name: props.statusTodo.name
    })
  }, [])

  const handleUpdateStatusTodo = useCallback(async () => {
    const errors = await form.validate()
    const hasErrors = errors && Object.keys(errors).length > 0
    if (hasErrors) {
      return
    }
    setIsLoading(true)
    try {
      const result = await updateStatusTodo.handlerRequest(form.values)
      if (result.hasError) {
        alerts.handle('warning', utils.capitalize(result.message))
        return
      }
      alerts.handle('success', utils.capitalize(result.message))
      form.setValues(old => ({ ...old, name: '' }))
      props.getStatusTodoAfterUpdated({
        id: form.values.id,
        name: form.values.name,
        createdAt: props.statusTodo.createdAt,
        updatedAt: new Date()
      })
      props.handleClose()
      form.setValues(old => ({ ...old, name: '' }))
    } catch (ex) {
      alerts.handle('error', 'Não foi possível atualizar o status, tente novamente mais tarde')
    } finally {
      setIsLoading(false)
    }
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
            disabled={isLoading}
            error={!!form.errors.name}
            value={form.values.name}
            helperText={form.errors.name && form.errors.name}
            onChange={e => form.setValues(old => ({ ...old, name: e.target.value }))}
            onKeyPress={e => e.key === 'Enter' && handleUpdateStatusTodo()}
          />
          <ButtonsStack direction='row' spacing={4}>
            <Button
              color="error"
              disabled={isLoading}
              variant="contained"
              onClick={props.handleClose}>
                Cancelar
            </Button>
            <Button
              color='warning'
              disabled={isLoading}
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
