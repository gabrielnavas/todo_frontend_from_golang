import {
  Button as ButtonMUI,
  TextField,
  Typography,
  Stack,
  Box
} from '@mui/material'

import { styled } from '@mui/material/styles'

export const Container = styled(Box)(() => ({
  position: 'absolute' as string,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  border: '0.5px solid #0008',
  borderRadius: 2,
  boxShadow: 24,
  padding: '50px 70px'
} as any))

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
