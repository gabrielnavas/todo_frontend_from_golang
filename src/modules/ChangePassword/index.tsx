import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../api/user/user/changePassword'

import TopBar from '../../components/TopBar'
import { AddMessageServerError, AddMessagesSuccess, AddMessageUsecaseError, resetAllMessages } from '../../store/actions/messages/messages'
import { Reducers } from '../../store/reducers/reducerRoot'
import MessagesGlobal from '../MessagesGlobal'
import { useForm } from './hooks/useForm'
import {
  ButtonToBack,
  Container,
  ContentHeader,
  ContentMainStack,
  ContentStack,
  ContentTitle,
  Page,

  OldPasswordTextInput,
  NewPasswordTextInput,
  NewPasswordConfirmationTextInput,
  FormGroupStack,
  ContentFooterStack,
  ButtonConfirm
} from './styles'

const ChangePasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const store = useSelector<Reducers, Reducers>(store => store)
  const form = useForm()

  useEffect(() => {
    if (!store.userStore.isLogging) {
      router.replace('/login')
    }
  }, [store.userStore.isLogging])

  const handleToBack = useCallback(() => {
    router.back()
  }, [router.back])

  const handleButtonConfirm = useCallback(async () => {
    try {
      setIsLoading(true)
      const result = await changePassword({
        token: store.userStore.token,
        userId: store.userStore.user.id,
        payload: {
          oldPassword: form.values.oldPassword,
          newPassword: form.values.newPassword,
          newPasswordConfirmation: form.values.newPasswordConfirmation
        }
      })
      if (result.ok) {
        dispatch(AddMessagesSuccess({ messagesSuccess: [result.message] }))
        router.replace('/settings')
      } else {
        dispatch(AddMessageUsecaseError({ usecaseErrors: [result.message] }))
      }
    } catch (ex) {
      dispatch(AddMessageServerError({ serverErrors: ['Servidor fora do ar'] }))
    } finally {
      setIsLoading(false)
      dispatch(resetAllMessages())
    }
  }, [form.values, changePassword, dispatch, AddMessagesSuccess, AddMessageUsecaseError, AddMessageServerError])

  return (
    <Page>
    <TopBar />
    <Container>
      <ContentStack spacing={3}>
        <ContentHeader>
          <ContentTitle variant="h6" >Configurações</ContentTitle>
          <ButtonToBack variant="outlined" onClick={handleToBack}>Voltar</ButtonToBack>
        </ContentHeader>
        <ContentMainStack spacing={2} direction='column'>
          <FormGroupStack spacing={3}>
            <OldPasswordTextInput
              variant="standard"
              type="password"
              label="Senha antiga"
              disabled={isLoading}
              error={!!form.errors.oldPassword}
              value={form.values.oldPassword}
              helperText={form.errors.oldPassword && form.errors.oldPassword}
              onChange={e => form.setValues(old => ({ ...old, oldPassword: e.target.value }))}
              onKeyPress={e => e.key === 'Enter' && handleButtonConfirm()}
              />
          </FormGroupStack>
          <FormGroupStack spacing={3}>
            <NewPasswordTextInput
              variant="standard"
              type="password"
              label="Nova senha"
              disabled={isLoading}
              error={!!form.errors.newPassword}
              value={form.values.newPassword}
              helperText={form.errors.newPassword && form.errors.newPassword}
              onChange={e => form.setValues(old => ({ ...old, newPassword: e.target.value }))}
              onKeyPress={e => e.key === 'Enter' && handleButtonConfirm()}
            />
            <NewPasswordConfirmationTextInput
              variant="standard"
              type="password"
              label="Confirmação da nova senha"
              disabled={isLoading}
              error={!!form.errors.newPasswordConfirmation}
              value={form.values.newPasswordConfirmation}
              helperText={form.errors.newPasswordConfirmation && form.errors.newPasswordConfirmation}
              onChange={e => form.setValues(old => ({ ...old, newPasswordConfirmation: e.target.value }))}
              onKeyPress={e => e.key === 'Enter' && handleButtonConfirm()}
              />
          </FormGroupStack>
        </ContentMainStack>
        <ContentFooterStack>
          <ButtonConfirm variant="contained" onClick={handleButtonConfirm}>Mudar</ButtonConfirm>
        </ContentFooterStack>
      </ContentStack>
    </Container>
    <MessagesGlobal />
  </Page>
  )
}

export default ChangePasswordPage
