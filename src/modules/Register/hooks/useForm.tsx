import { useFormik } from 'formik'
import { useValidate } from '../../../hooks/validation/useValidate'

type LoginForm = {
  name: string
  email: string
  username: string
  password: string
  passwordConfirmation: string
}

const useForm = () => {
  const validate = useValidate()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      username: '',
      password: '',
      passwordConfirmation: ''
    },
    validate: values => {
      const errors = {} as LoginForm
      if (values.name.length === 0) {
        errors.name = 'Digite um nome...'
      }
      if (values.username.length === 0) {
        errors.username = 'Digite um nome...'
      }
      if (!validate.isEmail(values.email)) {
        errors.email = 'Digite um email válido...'
      }
      if (values.password.length === 0) {
        errors.password = 'Digite uma senha...'
      }
      if (values.passwordConfirmation.length === 0) {
        errors.passwordConfirmation = 'Digite a confirmação de senha...'
      }
      if (values.password !== values.passwordConfirmation) {
        errors.passwordConfirmation = 'Senha diferente da confirmação de senha...'
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

export default useForm
