import { Button, Paper as PaperMUI, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Page = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  background: 'black'
}))

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center'
}))

export const Paper = styled(PaperMUI)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',

  marginTop: 100,

  background: '#FFF1',

  [theme.breakpoints.down('sm')]: {
    background: 'none',
    width: '100%',
    marginTop: 20
  }
}))

export const Header = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  padding: '15px 50px 10px 50px'
}))

export const Title = styled('span')(({ theme }) => ({
  flexGrow: 1,
  fontWeight: '500',
  fontSize: 25,
  fontFamily: 'Roboto',
  color: 'white',
  letterSpacing: 1.5
}))

export const ButtonAddStatusTodo = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.dark,
  padding: 5
}))

export const BodyStack = styled(Stack)(({ theme }) => ({

  maxWidth: 1180,
  maxHeight: 570,

  overflow: 'auto',

  '&::-webkit-scrollbar': {
    height: '10px'
  },

  '&::-webkit-scrollbar-track': {
    marginRight: 5,
    marginLeft: 5,
    background: '#1118'
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#FFF5'
  },

  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'none'
  },

  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))
