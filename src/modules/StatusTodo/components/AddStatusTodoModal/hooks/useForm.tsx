import { useFormik } from 'formik'

type StatusForm = {
  name: string
}

const useForm = () => {
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validate: values => {
      const errors = {} as StatusForm
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
