import { useFormik } from 'formik'

type LoginForm = {
  username: string
  password: string
}

const useForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate: values => {
      const errors = {} as LoginForm
      if (values.username.length === 0) {
        errors.username = 'Digite um nome de usuário...'
      }
      if (values.username.length > 255) {
        errors.username = 'Nome de usuário muito longo...'
      }
      if (values.password.length < 6) {
        errors.password = 'Senha muito pequena...'
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
