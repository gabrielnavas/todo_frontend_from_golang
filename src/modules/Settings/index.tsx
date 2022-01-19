import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import TopBar from '../../components/TopBar'
import { Reducers } from '../../store/reducers/reducerRoot'
import {
  Container,
  ContentStack,
  ContentTitle,
  Page,
  ContentMainStack,
  Option,
  ContentHeader,
  ButtonToBack,
  OptionTitle,
  ButtonOption
} from './styles'

const SettingsPage = () => {
  const router = useRouter()
  const store = useSelector<Reducers, Reducers>(store => store)

  useEffect(() => {
    if (!store.userStore.isLogging) {
      router.replace('/login')
    }
  }, [store.userStore.isLogging])

  const handleToBack = useCallback(() => {
    router.back()
  }, [router.back])

  const handleChangePassword = useCallback(() => {
    router.push('/settings/changepassword')
  }, [router.back])

  return (
    <Page>
      <TopBar />
      <Container>
        <ContentStack spacing={3}>
          <ContentHeader>
            <ContentTitle variant="h6" >Configurações</ContentTitle>
            <ButtonToBack variant="outlined" onClick={handleToBack}>Voltar</ButtonToBack>
          </ContentHeader>
          <ContentMainStack spacing={3} direction='column'>
            <Option>
              <OptionTitle>Mudar sua senha.</OptionTitle>
              <ButtonOption variant="contained" onClick={handleChangePassword}>Mudar</ButtonOption>
            </Option>
          </ContentMainStack>
        </ContentStack>
      </Container>
    </Page>
  )
}

export default SettingsPage
