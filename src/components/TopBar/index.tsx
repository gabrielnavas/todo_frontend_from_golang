import { useState, MouseEvent, useCallback } from 'react'
import { useRouter } from 'next/router'

import { useDispatch, useSelector } from 'react-redux'

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Stack
} from '@mui/material'

import AccountCircle from '@mui/icons-material/AccountCircle'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import SettingsIcon from '@mui/icons-material/Settings'
import LoginIcon from '@mui/icons-material/Login'

import { Reducers } from '../../store/reducers/reducerRoot'
import { logOffUser } from '../../store/actions/user/login'

import { useAlert } from '../../hooks/alert/useAlert'
import { TitleTopBar } from './styles'

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const state = useSelector<Reducers, Reducers>(state => state)
  const dispatch = useDispatch()

  const alert = useAlert()
  const router = useRouter()

  const handleLogoff = useCallback(() => {
    dispatch(logOffUser())
    setAnchorEl(null)
    alert.handle('success', 'Até mais!')
    router.replace('/login')
  }, [dispatch, logOffUser, alert.handle, router.replace])

  const handleSettings = useCallback(() => {
    router.push('/settings')
  }, [router.push])

  const handleMainPage = useCallback(() => {
    router.push('/')
  }, [router.push])

  const renderWhenLogging = () => (
    <div>
      <IconButton
        size="large"
        onClick={(event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleSettings}>
          <SettingsIcon /> <span>Configurações</span>
        </MenuItem>
        <MenuItem onClick={handleLogoff}>
          <ExitToAppIcon /> <span>Sair</span>
        </MenuItem>
      </Menu>
    </div>
  )

  const renderWhenNotLogging = () => (
    <Stack spacing={1} direction="row" style={{ display: 'flex', alignItems: 'center' }}>
      <Button variant="text" onClick={() => router.push('/register')}>
        <AccountBoxIcon />
      </Button>
      <span>|</span>
      <Button variant="text" onClick={() => router.push('/login')}>
        <LoginIcon />
      </Button>
    </Stack>
  )

  // TODO: criar components pra cada um
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#7775' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <CheckCircleIcon />
          </IconButton>
          <TitleTopBar variant="h5" onClick={handleMainPage}>
            Todo App
          </TitleTopBar>
          {
            state.userStore.isLogging ? renderWhenLogging() : renderWhenNotLogging()
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar
