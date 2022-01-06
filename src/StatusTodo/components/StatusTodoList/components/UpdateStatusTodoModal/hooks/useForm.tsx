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
