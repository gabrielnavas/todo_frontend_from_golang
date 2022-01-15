import { getEndpoint } from '../../getEndpoint'

export type AddStatusTodoParam = {
  name: string
}

export type AddStatusTodoResponse = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date

  ok: boolean
  message: string
}

export type addStatusTodoFn = (token: string, statusTodo: AddStatusTodoParam) => Promise<AddStatusTodoResponse>

export const addStatusTodo: addStatusTodoFn = async (token: string, statusTodo: AddStatusTodoParam): Promise<AddStatusTodoResponse> => {
  const url = `${getEndpoint()}/todos/status`
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    method: 'POST',
    body: JSON.stringify(statusTodo)
  })

  const data = await response.json()

  if (response.status === 400) {
    return {
      ok: false,
      message: data.message
    } as AddStatusTodoResponse
  }

  if (response.status === 201) {
    return {
      id: data.id,
      name: data.name,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),

      ok: true,
      message: 'Todo adicionado com sucesso.'
    }
  }

  throw new Error(`expected status 201, but received ${response.status}`)
}
