import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

type Props = {
  open: boolean
  handleClose: () => void
  handleOnSubmit: () => void
}

const RemoveStatusTodoDialog = (props: Props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Alerta!
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deseja realmente deletar esse Status Todo?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="warning"
          variant="outlined"
          onClick={props.handleClose}>Cancelar</Button>
        <Button
          color="error"
          variant="contained"
          onClick={props.handleOnSubmit}
          autoFocus>
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RemoveStatusTodoDialog
