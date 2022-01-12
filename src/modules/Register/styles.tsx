import { Button, Stack, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Page = styled('div')(({ theme }) => ({
  height: '100vh',
  background: 'black'
}))

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: 30
}))

export const ContentStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 50px',
  background: 'white',
  borderRadius: 15,
  width: 400
}))

export const ContentHeaderStack = styled(Stack)(({ theme }) => ({
}))

export const TitleHeader = styled(Typography)(({ theme }) => ({
}))

export const ContentBodyStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column'
}))

export const NameTextInput = styled(TextField)(({ theme }) => ({
}))

export const EmailTextInput = styled(TextField)(({ theme }) => ({
}))

export const UsernameTextInput = styled(TextField)(({ theme }) => ({
}))

export const PasswordTextInput = styled(TextField)(({ theme }) => ({
}))

export const ContentFooterStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column'
}))

export const ButtonRegister = styled(Button)(({ theme }) => ({
}))

export const ButtonLogin = styled(Button)(({ theme }) => ({
}))
