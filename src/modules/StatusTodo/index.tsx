import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Reducers } from '../../store/reducers/reducerRoot'
import { resetAllMessages } from '../../store/actions/todo/errors'

import {
  Page,
  Container,
  Paper,
  Header,
  Title,
  ButtonAddStatusTodo,
  BodyStack
} from './styles'

import { IconAddStatusTodo } from './icons'
import StatusTodoLists from './components/StatusTodoLists'
import AddStatusTodoModal from './components/AddStatusTodoModal'

import { useAlert } from '../../hooks/alert/useAlert'

const StatusTodoView = () => {
  const [toggleAddStatusTodoModal, setToggleAddStatusTodoModal] = useState(false)

  // TODO: Adicionar isLoading no state global
  const isLoading = false

  const alerts = useAlert()

  const store = useSelector<Reducers, Reducers>(state => state)
  const dispatch = useDispatch()

  // watch message ok
  useEffect(() => {
    if (store.statusTodoStore.messageOk) {
      alerts.handle('success', store.statusTodoStore.messageOk)
      return
    }
    dispatch(resetAllMessages())
  }, [store.statusTodoStore.messageOk])

  // watch usecase error
  useEffect(() => {
    if (store.statusTodoStore.usecaseError) {
      alerts.handle('warning', store.statusTodoStore.usecaseError)
      return
    }
    dispatch(resetAllMessages())
  }, [store.statusTodoStore.usecaseError])

  // watch server error
  useEffect(() => {
    if (store.statusTodoStore.serverError) {
      alerts.handle('error', store.statusTodoStore.serverError)
    }
    dispatch(resetAllMessages())
  }, [store.statusTodoStore.serverError])

  return (
    <Page>
      <Container>
        <Paper>
          <Header>
            <Title>Todo App</Title>
            <ButtonAddStatusTodo
              variant="contained"
              size="small"
              onClick={() => setToggleAddStatusTodoModal(true)}>
              <IconAddStatusTodo />
            </ButtonAddStatusTodo>
          </Header>
          <BodyStack direction='row'>
            <StatusTodoLists
              isLoading={isLoading}
            />
          </BodyStack>
        </Paper>
      </Container>
      <AddStatusTodoModal
        isLoading={isLoading}
        open={toggleAddStatusTodoModal}
        handleClose={() => setToggleAddStatusTodoModal(false)} />
    </Page>
  )
}

export default StatusTodoView