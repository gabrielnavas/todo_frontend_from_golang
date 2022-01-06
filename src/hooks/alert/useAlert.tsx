import { toast } from 'react-toastify'

type TypeAlert = 'error' | 'success' | 'warning' | 'error' | 'default'

const useAlert = () => {
  const handle = (type: TypeAlert, message: string) => {
    const options = {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    } as any
    if (type === 'error') {
      toast.info(message, options)
    }
    if (type === 'success') {
      toast.success(message, options)
    }
    if (type === 'warning') {
      toast.warning(message, options)
    }
    if (type === 'error') {
      toast.error(message, options)
    }
    if (type === 'default') {
      toast(message, options)
    }
  }
  return { handle }
}

export { useAlert }
