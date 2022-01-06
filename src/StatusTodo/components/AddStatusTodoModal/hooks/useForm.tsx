import { useFormik } from 'formik'

type StatusTodoDto = {
  name: string
}

const useForm = () => {
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validate: values => {
      const errors = {} as StatusTodoDto
      if (values.name.length === 0) {
        if (values.name.length === 0) {
          errors.name = 'Digite um nome...'
        }
        return errors
      }
    },
    onSubmit: async values => {
    }
  })

  return {
    values: formik.values,
    errors: formik.errors,
    setValues: formik.setValues,
    validate: formik.validateForm
  }
}

export default useForm
