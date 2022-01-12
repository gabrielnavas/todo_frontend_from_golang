import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { loginUserRequest } from '../../store/actions/user/login'
import useForm from './hooks/useForm'
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

const LoginPage = () => {
  const form = useForm()

  // TODO: adicionar isso no redux
  const isLoading = false
  const dispatch = useDispatch()

  const handleLogin = useCallback(() => {
    // TODO: FALTA TESTAR TODO O FLUXO DESSE REDUX
    dispatch(loginUserRequest({
      username: form.values.username,
      password: form.values.password
    }))
  }, [])

  return (
    <Page>
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              onClick={handleLogin}>
                Logar
            </ButtonLoggin>
            <ButtonRegister>Ainda não sou cadastrado</ButtonRegister>
          </ContentFooterStack>
        </ContentStack>
      </Container>
    </Page>
  )
}

export default LoginPage
