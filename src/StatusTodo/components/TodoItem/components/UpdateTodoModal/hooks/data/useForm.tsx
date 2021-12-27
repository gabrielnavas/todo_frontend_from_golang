import { useCallback, useRef } from 'react'

import { useFormik } from 'formik'

type Todo = {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  statusId: number
  imageUrl?: string
}

type Props = {
  todo: Todo
}

type TodoFormik = {
  title:string
  description: string
  imageUrl: string | null
  statusId: number
}

const useForm = (props: Props) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null)

  const formik = useFormik({
    initialValues: {
      title: props.todo.title,
      description: props.todo.description,
      imageUrl: props.todo.imageUrl ? props.todo.imageUrl : null,
      statusId: props.todo.statusId
    } as TodoFormik,
    validate: values => {
      const errors = {} as any
      if (values.title.length === 0) {
        errors.title = 'Digite um título'
      }
      if (values.title.length > 150) {
        errors.title = 'Título está muito grande'
      }
      if (values.description.length === 0) {
        errors.description = 'Faça uma descrição'
      }

      if (values.description.length > 255) {
        errors.description = 'Descrição está muito grande'
      }
      return errors
    },
    onSubmit: async values => { }
  })

  const handlerOnChangeImage = useCallback(() => {
    const files = inputFileRef.current.files
    const imageUrl = URL.createObjectURL(files[0])
    console.log(files[0])

    formik.setValues(old => ({ ...old, imageUrl: imageUrl }))
  }, [formik.setValues])

  const handlerRemoveImage = useCallback(() => {
    inputFileRef.current.value = null
    formik.setValues(old => ({ ...old, imageUrl: null }))
  }, [formik.setValues])

  return {
    values: formik.values,
    errors: formik.errors,
    setValues: formik.setValues,
    validate: formik.validateForm,
    onChangeImage: handlerOnChangeImage,
    onClickRemoveImage: handlerRemoveImage,
    fileRef: inputFileRef
  }
}

export { useForm }
