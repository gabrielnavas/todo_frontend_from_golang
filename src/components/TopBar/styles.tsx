import { Button, Stack, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const TitleTopBar = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  flexGrow: 1
}))

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: 60
}))

export const ContentStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 50,
  background: 'white',
  borderRadius: 15
}))

export const ContentHeaderStack = styled(Stack)(({ theme }) => ({
}))

export const TitleHeader = styled(Typography)(({ theme }) => ({
}))

export const ContentBodyStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column'
}))

export const UsernameTextInput = styled(TextField)(({ theme }) => ({
}))

export const PasswordTextInput = styled(TextField)(({ theme }) => ({
}))

export const ContentFooterStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column'
}))

export const ButtonLoggin = styled(Button)(({ theme }) => ({
}))

export const ButtonRegister = styled(Button)(({ theme }) => ({
}))
