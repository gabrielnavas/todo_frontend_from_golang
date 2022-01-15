import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import { Reducers } from '../../store/reducers/reducerRoot'

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

import TopBar from '../../components/TopBar'
import MessagesGlobal from '../MessagesGlobal'

const StatusTodoView = () => {
  const [toggleAddStatusTodoModal, setToggleAddStatusTodoModal] = useState(false)

  // TODO: Adicionar isLoading no state global
  const isLoading = false

  const router = useRouter()

  const store = useSelector<Reducers, Reducers>(state => state)

  useEffect(() => {
    if (!store.userStore.isLogging) {
      router.replace('/login')
    }
  }, [store.userStore.isLogging])

  return (
    <Page>
      <TopBar />
      <Container>
        <Paper>
          <Header>
            <Title>Status</Title>
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
      <MessagesGlobal />
    </Page>
  )
}

export default StatusTodoView
