import { useCallback } from 'react'

import { useApi } from '../../../../../../../shared/hooks/api/useApi'

type Params = {
  title: string
  description: string
  image: File | null
  statusId: number
}

type TodoCreated = {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  statusId: number
  imageUrl: string
}

type Result = {
  todo: TodoCreated | null
  hasError: boolean
  message: string
}

const useAddTodo = () => {
  const api = useApi()

  const handler = useCallback(async (payload: Params): Promise<Result> => {
    const response = await postForm(payload.title, payload.description, payload.statusId)

    const data = await response.json()
    if (response.status !== 201) {
      return {
        todo: null,
        hasError: true,
        message: data.message
      }
    }

    const todo: TodoCreated = {
      id: data.id,
      title: data.title,
      description: data.description,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      statusId: data.statusId,
      imageUrl: data.imageUrl
    }

    if (payload.image) {
      const response = await patchImage(todo.id, payload.image)
      if (response.status !== 204) {
        const data = await response.json()
        return {
          todo,
          hasError: false,
          message: data.message
        }
      }
      todo.imageUrl = makeImageUrl(todo.id)
    }
    return {
      todo,
      hasError: false,
      message: 'Todo adicionado com sucesso!'
    }
  }, [])

  const postForm = useCallback(async (title: string, description: string, statusId: number): Promise<Response> => {
    const url = `${api.getEndpoint()}/todos`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ title, description, statusId })
    })
    return response
  }, [api.getEndpoint])

  const patchImage = useCallback(async (todoId: number, image: File): Promise<Response> => {
    const url = `${api.getEndpoint()}/todos/image/${todoId}`
    const formFileImageName = 'image'
    const formData = new FormData()
    formData.set(formFileImageName, image, image.name)
    const response = await fetch(url, {
      method: 'PATCH',
      body: formData
    })
    return response
  }, [api.getEndpoint])

  const makeImageUrl = useCallback((todoId: number) => {
    const endpoint = api.getEndpoint()
    const url = `${endpoint}/todos/image/${todoId}`
    return url
  }, [api.getEndpoint])

  return { handler }
}

export { useAddTodo }
