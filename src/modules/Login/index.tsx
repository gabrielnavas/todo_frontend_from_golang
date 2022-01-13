import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useAlert } from '../../hooks/alert/useAlert'
import useForm from './hooks/useForm'

import { loginUserRequest, resetAllMessages } from '../../store/actions/user/login'
import { Reducers } from '../../store/reducers/reducerRoot'

import {
  Page,
  Container,
  ContentStack,
  ContentHeaderStack,
  TitleHeader,
  ContentBodyStack,
  UsernameTextInput,
  PasswordTextInput,
  ContentFooterStack,
  ButtonLoggin,
  ButtonRegister
} from './styles'
import { useRouter } from 'next/router'
import TopBar from '../../components/TopBar'

const LoginPage = () => {
  const form = useForm()
  const alerts = useAlert()
  const router = useRouter()

  const dispatch = useDispatch()
  const store = useSelector<Reducers, Reducers>(store => store)

  useEffect(() => {
    if (store.userStore.isLogging) {
      router.replace('/')
    }
    return () => {
      if (store.userStore.isLogging && store.userStore.messageOk) {
        alerts.handle('success', store.userStore.messageOk)
      }
    }
  }, [store.userStore.isLogging])

  useEffect(() => {
    if (store.userStore.usecaseError) {
      alerts.handle('warning', store.userStore.usecaseError)
      return
    }
    dispatch(resetAllMessages())
  }, [store.userStore.usecaseError])

  useEffect(() => {
    if (store.userStore.serverError) {
      alerts.handle('error', store.userStore.serverError)
    }
    dispatch(resetAllMessages())
  }, [store.userStore.serverError])

  const handleLogin = useCallback(() => {
    dispatch(loginUserRequest({
      username: form.values.username,
      password: form.values.password
    }))
  }, [dispatch, loginUserRequest, form.values])

  return (
    <Page>
      <TopBar />
      <Container>
        <ContentStack spacing={4}>
          <ContentHeaderStack spacing={4}>
            <TitleHeader variant="h5">Faça o login</TitleHeader>
          </ContentHeaderStack>
          <ContentBodyStack spacing={2}>
            <UsernameTextInput
              type="text"
              label="Nome de usuário"
              variant="standard"
              disabled={store.userStore.isLoading}
              error={!!form.errors.username}
              value={form.values.username}
              helperText={form.errors.username && form.errors.username}
              onChange={e => form.setValues(old => ({ ...old, username: e.target.value }))}
              onKeyPress={e => e.key === 'Enter' && handleLogin()}
            />
            <PasswordTextInput
              type="password"
              label="Senha"
              variant="standard"
              disabled={store.userStore.isLoading}
              error={!!form.errors.password}
              value={form.values.password}
              helperText={form.errors.password && form.errors.password}
              onChange={e => form.setValues(old => ({ ...old, password: e.target.value }))}
              onKeyPress={e => e.key === 'Enter' && handleLogin()}
            />
          </ContentBodyStack>
          <ContentFooterStack spacing={3}>
            <ButtonLoggin
              variant="contained"
              disabled={store.userStore.isLoading}
              onClick={handleLogin}>
                Logar
            </ButtonLoggin>
            <ButtonRegister
              onClick={() => router.push('/register')}
              disabled={store.userStore.isLoading}>
              Ainda não sou cadastrado
            </ButtonRegister>
          </ContentFooterStack>
        </ContentStack>
      </Container>
    </Page>
  )
}

export default LoginPage
