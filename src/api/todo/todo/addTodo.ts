import { getEndpoint } from '../../getEndpoint'

const makeImageUrl = (todoId: number) => {
  const endpoint = getEndpoint()
  const url = `${endpoint}/todos/image/${todoId}`
  return url
}

const patchImage = async (todoId: number, image: File): Promise<Response> => {
  const url = `${getEndpoint()}/todos/image/${todoId}`
  const formFileImageName = 'image'
  const formData = new FormData()
  formData.set(formFileImageName, image, image.name)
  const response = await fetch(url, {
    method: 'PATCH',
    body: formData
  })
  return response
}

const postForm = async (title: string, description: string, statusId: number): Promise<Response> => {
  const url = `${getEndpoint()}/todos`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ title, description, statusId })
  })
  return response
}

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

export type AddTodoResult = {
  todo: TodoCreated | null
  ok: boolean
  message: string
}

export type AddTodoFn = (payload: Params) => Promise<AddTodoResult>

export const addTodo = async (payload: Params): Promise<AddTodoResult> => {
  const response = await postForm(payload.title, payload.description, payload.statusId)

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
    const response = await patchImage(todo.id, payload.image)
    if (response.status !== 204) {
      const data = await response.json()
      return {
        todo,
        ok: false,
        message: data.message
      }
    }
    todo.imageUrl = makeImageUrl(todo.id)
  }
  return {
    todo,
    ok: true,
    message: 'Todo adicionado com sucesso!'
  }
}
