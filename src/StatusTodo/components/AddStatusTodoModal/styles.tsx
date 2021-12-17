import {
  Button as ButtonMUI,
  TextField,
  Typography,
  Stack
} from '@mui/material'

import { styled } from '@mui/material/styles'

export const TextFieldName = styled(TextField)(({ theme }) => ({
  width: '100%'
}))

export const Button = styled(ButtonMUI)(({ theme }) => ({
}))

export const Title = styled(Typography)(({ theme }) => ({
  padding: '20px 0'
}))

export const FormStack = styled(Stack)(({ theme }) => ({
  marginTop: 2
}))

export const ButtonsStack = styled(Stack)(({ theme }) => ({
}))
