import { getEndpoint } from '../../getEndpoint'
import { getImage, makeApiUrlById, makeLocalUrl } from './getImage'

type Todo = {
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

export type AddTodoResult = {
  todo: TodoCreated | null
  ok: boolean
  message: string
}

export type AddTodoFn = (token: string, payload: Todo) => Promise<AddTodoResult>

export const addTodo: AddTodoFn = async (token, payload: Todo): Promise<AddTodoResult> => {
  const response = await postForm(token, payload.title, payload.description, payload.statusId)

  const data = await response.json()
  if (response.status !== 201) {
    return {
      todo: null,
      ok: false,
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
    const response = await patchImage(token, todo.id, payload.image)
    if (response.status !== 204) {
      const data = await response.json()
      return {
        todo,
        ok: false,
        message: data.message
      }
    }
    const imageApiUrl: string = makeApiUrlById(todo.id)
    const image: File = await getImage(token, imageApiUrl, 'image')
    const imageLocalUrl: string = makeLocalUrl(image)
    todo.imageUrl = imageLocalUrl
  }
  return {
    todo,
    ok: true,
    message: 'Todo adicionado com sucesso!'
  }
}

const patchImage = async (token: string, todoId: number, image: File): Promise<Response> => {
  const url = `${getEndpoint()}/todos/image/${todoId}`
  const formFileImageName = 'image'
  const formData = new FormData()
  formData.set(formFileImageName, image, image.name)
  const response = await fetch(url, {
    method: 'PATCH',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

const postForm = async (token: string, title: string, description: string, statusId: number): Promise<Response> => {
  const url = `${getEndpoint()}/todos`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, description, statusId })
  })
  return response
}
