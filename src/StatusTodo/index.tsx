import { useState } from 'react'

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

const StatusTodoView = () => {
  const [toggleAddStatusTodoModal, setToggleAddStatusTodoModal] = useState(false)

  // TODO: Adicionar isLoading no state global
  const isLoading = false

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
