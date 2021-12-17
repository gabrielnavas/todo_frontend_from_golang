import { styled } from '@mui/material/styles'

export const EmptyTodoItemList = styled('li')(({ theme }) => ({
  display: 'flex',
  padding: '20px 0',

  fontWeight: 'bold',
  fontSize: 16,
  fontFamily: 'Roboto',

  wordWrap: 'break-word'
}))
