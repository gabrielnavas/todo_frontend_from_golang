import { Button, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Container = styled('div')(({ theme }) => ({
  overflow: 'auto',
  margin: '15px 25px 10px 15px',
  padding: '0px 20px 20px 20px',
  background: 'white',

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

  [theme.breakpoints.up('md')]: {
    minWidth: 550
  },

  [theme.breakpoints.down('md')]: {
    width: 400
  },

  [theme.breakpoints.down('sm')]: {
    width: 300
  }

}))

export const HeaderStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  paddingTop: 10,
  paddingBottom: 10,
  background: 'white',
  borderBottom: `2px solid  ${theme.palette.primary.dark}`,
  position: 'sticky',
  top: 0,
  left: 0,
  zIndex: theme.zIndex.appBar,

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}))

export const Title = styled('span')(({ theme }) => ({
  flexGrow: 1,
  width: 300,

  fontWeight: 'bold',
  fontSize: 18,
  fontFamily: 'Roboto, sans-serif',

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  [theme.breakpoints.down('sm')]: {
    width: 240
  }
}))

export const ButtonsHeader = styled('div')(({ theme }) => ({
  display: 'flex'
}))

export const ButtonHeader = styled(Button)(() => ({
  marginLeft: 8
}))

export const Body = styled('ul')(() => ({
  marginLeft: 8
}))
