import { getEndpoint } from '../../getEndpoint'

import { deleteImage } from './deleteImage'
import { getImage } from './getImage'
import { patchImage } from './patchImage'

type UpdateTodoParams = {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  statusId: number
  imageUrl?: string
}

export type UpdateTodoResult = {
  todo: UpdateTodoParams
  ok: boolean
  message: string
}

export type UpdateTodoFn = (token: string, todo: UpdateTodoParams) => Promise<UpdateTodoResult>

export const updateTodo: UpdateTodoFn = async (token: string, todo: UpdateTodoParams): Promise<UpdateTodoResult> => {
  let image: File | null = null
  const response = await postForm(token, todo.id, todo.title, todo.description, todo.statusId)

  if (response.status !== 204) {
    const data = await response.json()
    return {
      todo: {} as UpdateTodoParams,
      ok: false,
      message: data.message
    }
  }

  if (todo.imageUrl) {
    image = await getImage(token, todo.imageUrl, 'image')
    const response = await patchImage(token, todo.id, image)
    if (response.status !== 204) {
      const data = await response.json()
      return {
        todo: {} as UpdateTodoParams,
        ok: false,
        message: data.message
      }
    }
  } else {
    const response = await deleteImage(token, todo.id)
    if (response.status !== 204) {
      const data = await response.json()
      return {
        todo: {} as UpdateTodoParams,
        ok: false,
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
    } as UpdateTodoParams,
    ok: true,
    message: 'Todo atualizado com sucesso!'
  }
}

const postForm = async (token: string, todoId: number, title: string, description: string, statusId: number): Promise<Response> => {
  const url = `${getEndpoint()}/todos/${todoId}`
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, description, statusId })
  })

  return response
}
