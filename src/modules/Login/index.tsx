import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useForm from './hooks/useForm'

import { loginUserFail, loginUserRequest } from '../../store/actions/user/login'
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
import MessagesGlobal from '../MessagesGlobal'

const LoginPage = () => {
  const form = useForm()
  const router = useRouter()

  const dispatch = useDispatch()
  const store = useSelector<Reducers, Reducers>(store => store)

  useEffect(() => {
    if (store.userStore.isLogging) {
      router.replace('/')
    }
  }, [store.userStore.isLogging])

  const handleLogin = useCallback(() => {
    try {
      dispatch(loginUserRequest({
        username: form.values.username,
        password: form.values.password
      }))
    } catch (ex) {
      dispatch(loginUserFail())
    }
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
      <MessagesGlobal />
    </Page>
  )
}

export default LoginPage
