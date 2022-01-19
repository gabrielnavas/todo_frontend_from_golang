import { useFormik } from 'formik'

type ChangePasswordForm = {
  oldPassword: string
  newPassword: string
  newPasswordConfirmation: string
}

const useForm = () => {
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirmation: ''
    },
    validate: values => {
      const errors = {} as ChangePasswordForm
      if (values.oldPassword.length < 6) {
        errors.oldPassword = 'Senha muito pequena...'
      }
      if (values.oldPassword.length > 6) {
        errors.oldPassword = 'Senha muito grande...'
      }

      if (values.newPassword.length < 6) {
        errors.newPassword = 'Senha muito pequena...'
      }
      if (values.newPassword.length > 6) {
        errors.newPassword = 'Senha muito grande...'
      }

      if (values.newPasswordConfirmation.length < 6) {
        errors.newPasswordConfirmation = 'Senha muito pequena...'
      }
      if (values.newPasswordConfirmation.length > 6) {
        errors.newPasswordConfirmation = 'Senha muito grande...'
      }

      if (values.newPassword !== values.newPasswordConfirmation) {
        errors.newPasswordConfirmation = 'Senha diferente da confirmação de senha...'
      }
      return errors
    },
    onSubmit: async values => { }
  })

  return {
    values: formik.values,
    errors: formik.errors,
    setValues: formik.setValues,
    validate: formik.validateForm,
    resetForm: formik.resetForm
  }
}

export { useForm }
