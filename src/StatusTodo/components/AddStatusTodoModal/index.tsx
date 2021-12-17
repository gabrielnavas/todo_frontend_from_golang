import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import {
  TextFieldName,
  ButtonsStack,
  Button,
  Title,
  FormStack
} from './styles'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '0.5px solid #0008',
  borderRadius: 2,
  boxShadow: 24,
  padding: '50px 70px'
}

type Props = {
  handleClose: () => void
  open: boolean
}

const AddStatusTodoModal = (props: Props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
    >
      <Box sx={style}>
        <Title variant="h6" >
          Insert novo status.
        </Title>
        <FormStack spacing={4}>
          <TextFieldName
            error
            id="standard-error-helper-text"
            label="Nome do novo status"
            defaultValue="Hello World"
            helperText="Incorrect entry."
            variant="standard"
          />
          <ButtonsStack direction='row' spacing={4}>
            <Button variant="contained" color="warning">Cancelar</Button>
            <Button variant="contained" color="success">Inserir</Button>
          </ButtonsStack>
        </FormStack>
      </Box>
    </Modal>
  )
}

export default AddStatusTodoModal
