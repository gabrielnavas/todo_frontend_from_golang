import { getEndpoint } from '../..'

type UpdateStatusTodoParam = {
  id: number
  name: string
}

export type UpdateStatusTodoResponse = {
  ok: boolean
  message: string
}

export type UpdateStatusTodoFn = (statusTodo: UpdateStatusTodoParam) => Promise<UpdateStatusTodoResponse>

export const updateStatusTodo = async (statusTodo: UpdateStatusTodoParam): Promise<UpdateStatusTodoResponse> => {
  const url = `${getEndpoint()}/todos/status/${statusTodo.id}`
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(statusTodo)
  })

  if (response.status === 400) {
    const data = await response.json()
    return {
      ok: true,
      message: data.message
    }
  }

  if (response.status === 204) {
    return {
      ok: false,
      message: 'Status todo atualizado!'
    }
  }

  throw new Error(`expected status 204, but received ${response.status}`)
}
