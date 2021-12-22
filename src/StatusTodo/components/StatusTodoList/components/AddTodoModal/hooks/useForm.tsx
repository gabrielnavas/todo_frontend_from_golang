import { useCallback, useRef } from 'react'

import { useFormik } from 'formik'

type Todo = {
  title:string
  description: string
  image: File | null
}

const useForm = () => {
  const inputFileRef = useRef<HTMLInputElement | null>(null)

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      image: null
    } as Todo,
    validate: values => { },
    onSubmit: async values => { }
  })

  const handlerOnChangeImage = useCallback(() => {
    const files = inputFileRef.current.files
    formik.setValues(old => ({ ...old, image: files[0] }))
  }, [formik.setValues])

  const handlerRemoveImage = useCallback(() => {
    inputFileRef.current.value = null
    formik.setValues(old => ({ ...old, image: null }))
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
