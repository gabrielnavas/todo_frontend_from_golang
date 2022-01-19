import { Button, Stack, Typography } from '@mui/material'
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
  padding: '10px 25px',
  background: 'white',
  borderRadius: 15,
  width: 500
}))

export const ContentTitle = styled(Typography)(({ theme }) => ({
}))

export const ContentHeader = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '20px 0 20px 0',
  padding: '10px 0',
  borderBottom: `1px solid ${theme.palette.primary.dark}`
}))

export const ContentMainStack = styled(Stack)(({ theme }) => ({
}))

export const Option = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px 10px 20px'
}))

export const OptionTitle = styled('span')(({ theme }) => ({
}))

export const ButtonOption = styled(Button)(({ theme }) => ({
}))

export const ButtonToBack = styled(Button)(({ theme }) => ({
}))
