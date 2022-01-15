import { useFormik } from 'formik'

type Props = {
  name: string
}

type StatusTodoDto = {
  name: string
}

const useForm = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      id: 0,
      name: props.name
    },
    validate: values => {
      const errors = {} as StatusTodoDto
      if (values.name.length <= 1) {
        errors.name = 'Nome muito pequeno...'
      }
      return errors
    },
    onSubmit: async values => {
    }
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
