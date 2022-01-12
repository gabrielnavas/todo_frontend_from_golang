import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

type Props = {
  open: boolean
  onClose: () => void
  onSubmit: () => void
}

const DeleteConfirmationDialog = (props: Props) => {
  return (
    <Dialog
        open={props.open}
        onClose={props.onClose}
    >
      <DialogTitle id="responsive-dialog-title">
        Confirmação
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Você realmente quer deletar esse Todo??
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="warning"
          autoFocus
          onClick={props.onClose}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={props.onSubmit}
          autoFocus>
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default DeleteConfirmationDialog
