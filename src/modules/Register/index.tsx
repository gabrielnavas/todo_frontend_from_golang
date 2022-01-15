import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { addUser, AddUserResponse } from '../../api/user/user/addUser'
import { useAlert } from '../../hooks/alert/useAlert'

import useForm from './hooks/useForm'

import {
  Page,
  Container,
  ContentStack,
  ContentHeaderStack,
  TitleHeader,
  ContentBodyStack,
  EmailTextInput,
  NameTextInput,
  UsernameTextInput,
  PasswordTextInput,
  ContentFooterStack,
  ButtonRegister,
  ButtonLogin
} from './styles'
import { useSelector } from 'react-redux'
import { Reducers } from '../../store/reducers/reducerRoot'
import TopBar from '../../components/TopBar'
import MessagesGlobal from '../MessagesGlobal'

const RegisterPage = () => {
  const form = useForm()
  const alert = useAlert()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const store = useSelector<Reducers, Reducers>(store => store)

  const handleAddUser = useCallback(() => {
    async function _fetch () {
      setIsLoading(true)
      const response = await addUser({
        name: form.values.name,
        email: form.values.email,
        username: form.values.username,
        password: form.values.password,
        passwordConfirmation: form.values.passwordConfirmation
      })
      setIsLoading(true)
      return response
    }

    _fetch()
      .then((resp: AddUserResponse) => {
        if (resp.ok) {
          alert.handle('success', resp.message)
          router.push('login')
        } else {
          alert.handle('warning', resp.message)
        }
      })
      .catch(() => {
        alert.handle('error', 'Servidor fora do ar, tente novamente mais tarde')
      })
  }, [addUser, form.values])

  useEffect(() => {
    if (store.userStore.isLogging) {
      router.replace('/')
    }
  }, [store.userStore.isLogging])

  return (
    <Page>
      <TopBar />
      <Container>
        <ContentStack spacing={4}>
          <ContentHeaderStack spacing={2}>
            <TitleHeader variant="h5">Faça o cadastro</TitleHeader>
          </ContentHeaderStack>
          <ContentBodyStack spacing={2}>
            <NameTextInput
              type="text"
              label="Nome completo"
              variant="standard"
              disabled={isLoading}
              error={!!form.errors.name}
              value={form.values.name}
              helperText={form.errors.name && form.errors.name}
              onChange={e => form.setValues(old => ({ ...old, name: e.target.value }))}
              onKeyPress={e => e.key === 'Enter' && handleAddUser()}
            />
            <EmailTextInput
              type="email"
              label="Email"
              variant="standard"
              disabled={isLoading}
              error={!!form.errors.email}
              value={form.values.email}
              helperText={form.errors.email && form.errors.email}
              onChange={e => form.setValues(old => ({ ...old, email: e.target.value }))}
              onKeyPress={e => e.key === 'Enter' && handleAddUser()}
            />
            <UsernameTextInput
              type="text"
              label="Nome de usuário"
              variant="standard"
              disabled={isLoading}
              error={!!form.errors.username}
              value={form.values.username}
              helperText={form.errors.username && form.errors.username}
              onChange={e => form.setValues(old => ({ ...old, username: e.target.value }))}
              onKeyPress={e => e.key === 'Enter' && handleAddUser()}
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
              onKeyPress={e => e.key === 'Enter' && handleAddUser()}
            />
            <PasswordTextInput
              type="password"
              label="Confirmação de senha"
              variant="standard"
              disabled={isLoading}
              error={!!form.errors.passwordConfirmation}
              value={form.values.passwordConfirmation}
              helperText={form.errors.passwordConfirmation && form.errors.passwordConfirmation}
              onChange={e => form.setValues(old => ({ ...old, passwordConfirmation: e.target.value }))}
              onKeyPress={e => e.key === 'Enter' && handleAddUser()}
            />
          </ContentBodyStack>
          <ContentFooterStack spacing={3}>
            <ButtonRegister
              variant="contained"
              onClick={handleAddUser}>
                Logar
            </ButtonRegister>
            <ButtonLogin onClick={() => router.push('/login')}>
              Já tenho cadastro
            </ButtonLogin>
          </ContentFooterStack>
        </ContentStack>
      </Container>
      <MessagesGlobal />
    </Page>
  )
}

export default RegisterPage
