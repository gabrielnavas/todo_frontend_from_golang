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
  return (
    <Page>
      <Container>
        <ContentStack spacing={4}>
          <ContentHeaderStack spacing={4}>
            <TitleHeader variant="h5">Faça o login</TitleHeader>
          </ContentHeaderStack>
          <ContentBodyStack spacing={2}>
            <UsernameTextInput type="text" label="Nome de usuário" variant="standard" />
            <PasswordTextInput type="password" label="Senha" variant="standard" />
          </ContentBodyStack>
          <ContentFooterStack spacing={3}>
            <ButtonLoggin variant="contained">Logar</ButtonLoggin>
            <ButtonRegister>Ainda não sou cadastrado</ButtonRegister>
          </ContentFooterStack>
        </ContentStack>
      </Container>
    </Page>
  )
}

export default LoginPage
