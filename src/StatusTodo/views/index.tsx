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
import StatusTodoLists from '../components/StatusTodoLists'
import { fakeDataStatusTodo } from './fakeData'

const ListAllTodoPage = () => {
  return (
    <Page>
      <Container>
        <Paper>
          <Header>
            <Title>Todo App</Title>
            <ButtonAddStatusTodo variant="contained" size="small">
              <IconAddStatusTodo />
            </ButtonAddStatusTodo>
          </Header>
          <BodyStack direction='row'>
            <StatusTodoLists statusTodoLists={fakeDataStatusTodo} />
          </BodyStack>
        </Paper>
      </Container>
    </Page>
  )
}

export default ListAllTodoPage
