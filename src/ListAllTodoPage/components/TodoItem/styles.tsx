import { Button, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Container = styled('li')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  padding: '20px 0px',

  borderBottom: `1px solid  ${theme.palette.primary.dark}`
}))

export const Header = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '5px 0px',
  background: 'white',
  borderBottom: `2px solid  ${theme.palette.primary.dark}`,

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
    alignItems: 'flex-end'
  }
}))

export const Title = styled('span')(({ theme }) => ({
  display: 'flex',
  padding: '7px',

  fontWeight: '500',
  fontSize: 17,
  fontFamily: 'Roboto',

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  cursor: 'pointer',

  '&:hover': {
    background: '#1232'
  }
}))

export const ButtonHeader = styled(Button)(() => ({
  marginLeft: 8
}))

export const Description = styled('span')(() => ({
  fontWeight: '400',
  fontSize: 14,
  fontFamily: 'Roboto',

  wordWrap: 'break-word',

  cursor: 'pointer',

  '&:hover': {
    background: '#1232'
  }
}))

export const Image = styled('img')(({ theme }) => ({
  maxWidth: 495,

  cursor: 'pointer',

  '&:hover': {
    opacity: 0.6
  },

  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%'
  }
}))
