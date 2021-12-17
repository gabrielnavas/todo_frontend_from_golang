import Modal from '@mui/material/Modal'

import {
  Container,
  TextFieldName,
  ButtonsStack,
  Button,
  Title,
  FormStack
} from './styles'

type Props = {
  handleClose: () => void
  open: boolean
}

const AddStatusTodoModal = (props: Props) => {
  /** TODO:
   * usar formik
   * validar dados
   * tentar criar o status todo
   * mostrar error no toastify se der status 400
   * retornar status todo
   * adicionar na lista principal do app via callback function
   * mostrar mensagem via toastify que deu certo.
   *
   */

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
    >
      <Container>
        <Title variant="h6" >
          Insert novo status.
        </Title>
        <FormStack spacing={4}>
          <TextFieldName
            error
            id="standard-error-helper-text"
            label="Nome"
            defaultValue="Hello World"
            helperText="Incorrect entry."
            variant="standard"
          />
          <ButtonsStack direction='row' spacing={4}>
            <Button variant="contained" color="error">Cancelar</Button>
            <Button variant="contained" >Inserir</Button>
          </ButtonsStack>
        </FormStack>
      </Container>
    </Modal>
  )
}

export default AddStatusTodoModal
