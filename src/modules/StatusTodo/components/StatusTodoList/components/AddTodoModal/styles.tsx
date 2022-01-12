import {
  Button as ButtonMUI,
  TextField,
  Typography,
  Stack,
  Box,
  Button
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

export const TextFieldTitle = styled(TextField)(({ theme }) => ({
  width: '100%'
}))

export const TextFieldDescription = styled(TextField)(({ theme }) => ({
  width: '100%'
}))

export const ButtonFileUpload = styled(Button)(({ theme }) => ({
  width: '100%'
}))

export const FileUploadContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px 0'
}))

export const TitleFileUpload = styled('span')(({ theme }) => ({
  textAlign: 'center',
  width: '250px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
}))

export const StackFileUploadButtons = styled(Stack)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center'
}))

export const ButtonFinish = styled(ButtonMUI)(({ theme }) => ({
}))

export const Title = styled(Typography)(({ theme }) => ({
  padding: '20px 0'
}))

export const FormStack = styled(Stack)(({ theme }) => ({
  marginTop: 2
}))

export const ButtonsStack = styled(Stack)(({ theme }) => ({
}))
