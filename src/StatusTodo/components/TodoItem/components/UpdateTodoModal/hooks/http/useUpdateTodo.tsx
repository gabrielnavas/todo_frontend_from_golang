import { useCallback } from 'react'

import { useApi } from '../../../../../../../shared/hooks/api/useApi'

type Todo = {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  statusId: number
  imageUrl?: string
}

type Result = {
  todo: Todo
  hasError: boolean
  message: string
}

const urlBlobToFile = async (url: string, fileName: string): Promise<File> => {
  const theBlob = await fetch(url).then(r => r.blob())
  const b: any = theBlob
  b.lastModifiedDate = new Date()
  b.name = fileName
  return theBlob as File
}

const useUpdateTodo = () => {
  const api = useApi()

  const handler = useCallback(async (todo: Todo): Promise<Result> => {
    let image: File | null = null
    const response = await postForm(todo.id, todo.title, todo.description, todo.statusId)

    if (response.status !== 204) {
      const data = await response.json()
      return {
        todo: {} as Todo,
        hasError: true,
        message: data.message
      }
    }

    if (todo.imageUrl) {
      image = await urlBlobToFile(todo.imageUrl, 'image')
      const response = await patchImage(todo.id, image)
      if (response.status !== 204) {
        const data = await response.json()
        return {
          todo: {} as Todo,
          hasError: false,
          message: data.message
        }
      }
    } else {
      const response = await deleteImage(todo.id)
      if (response.status !== 204) {
        const data = await response.json()
        return {
          todo: {} as Todo,
          hasError: false,
          message: data.message
        }
      }
    }
    return {
      todo: {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        updatedAt: new Date(),
        imageUrl: image ? URL.createObjectURL(image) : null,
        statusId: todo.statusId
      } as Todo,
      hasError: false,
      message: 'Todo atualizado com sucesso!'
    }
  }, [])

  const postForm = useCallback(async (todoId: number, title: string, description: string, statusId: number): Promise<Response> => {
    const url = `${api.getEndpoint()}/todos/${todoId}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
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

  const deleteImage = useCallback(async (todoId: number): Promise<Response> => {
    const url = `${api.getEndpoint()}/todos/image/${todoId}`
    const response = await fetch(url, {
      method: 'DELETE'
    })
    return response
  }, [api.getEndpoint])

  return { handler }
}

export { useUpdateTodo }
