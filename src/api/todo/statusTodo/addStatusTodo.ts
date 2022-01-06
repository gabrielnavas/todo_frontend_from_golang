import { getEndpoint } from '../..'

export type AddStatusTodoParam = {
  name: string
}

export type AddStatusTodoResponse = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date

  messageError?: string
}

export type addStatusTodoFn = (statusTodo: AddStatusTodoParam) => Promise<AddStatusTodoResponse>

export const addStatusTodo = async (statusTodo: AddStatusTodoParam): Promise<AddStatusTodoResponse> => {
  const url = `${getEndpoint()}/todos/status`
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(statusTodo)
  })

  const data = await response.json()

  if (response.status === 400) {
    return {
      messageError: data.message
    } as AddStatusTodoResponse
  }

  if (response.status === 201) {
    return {
      id: data.id,
      name: data.name,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    }
  }

  throw new Error(`expected status 201, but received ${response.status}`)
}
