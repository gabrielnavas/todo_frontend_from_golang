import { useFormik } from 'formik'
import { useState } from 'react';
import { useCreateStatusTodo } from '../http/useCreateStatusTodo'

type StatusTodoDto = {
  name: string
}

const useForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validate: values => {
      const errors = {} as StatusTodoDto
      if (values.name.length === 0) {
        if(values.name.length === 0) {
          errors.name="Digite um nome..."
        }
        return errors
      }
    },
    onSubmit: async values => {
    }
  });
  
  return {
    values: formik.values,
    errors: formik.errors,
    setValues: formik.setValues,
    submit: formik.handleSubmit,
    validate: formik.validateForm
  }
}

export default useForm