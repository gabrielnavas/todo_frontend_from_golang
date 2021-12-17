import { useCallback } from 'react'

import {
  Container,
  Title,
  Description,
  Image,
  Header,
  ButtonHeader
} from './styles'

import { IconDelete } from './icons'

type Todo = {
  id: number
  title: string
  description: string
  image: string
}

type Props = {
  todo: Todo
}

/**
 * Renderiza um simples todo
 * @param props todo: Todo é um simples todo
 * @returns um Todo Item
 */
const TodoItem = (props: Props) => {
  const handleTodoItem = useCallback(() => {
    console.log('voce clicou no titulo, descricao ou imagem do todo')
  }, [])

  return (
    <Container onClick={handleTodoItem}>
      <Header>
        <Title>
          {props.todo.title}
        </Title>
        <ButtonHeader variant="contained" size="small" color="error">
          <IconDelete />
        </ButtonHeader>
      </Header>
      <Description>
        {props.todo.description}
      </Description>
      {
        props.todo.image &&
          <Image src={props.todo.image}/>
      }
    </Container>
  )
}

export default TodoItem
