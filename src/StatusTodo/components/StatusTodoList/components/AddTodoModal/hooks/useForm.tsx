import { useCallback, useRef } from "react"

import { useFormik } from "formik";

type Todo = {
  title:string
  description: string
  image: File | null
}

const useForm = () => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      image: null
    } as Todo,
    validate: values => { },
    onSubmit: async values => { }
  });
  
  /**
   * TODO: Esta setando a imagem, mas quando retiro tento adicionar a mesma imagem
   * a imagem nao adiciona
   */
  const handlerOnChangeImage = useCallback(() => {
    const files = inputFileRef.current.files
    formik.setValues(old => ({...old, image: files[0]}))
    console.log('oi');
    
  }, [formik.setValues, inputFileRef.current])

  const handlerRemoveImage = useCallback(() => {
    formik.setValues(old => ({...old, image: null}))
  }, [formik.setValues,inputFileRef.current])

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

export {useForm}