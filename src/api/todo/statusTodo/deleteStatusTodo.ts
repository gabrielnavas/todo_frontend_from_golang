import { getEndpoint } from '../../getEndpoint'

export type DeleteStatusTodoResponse = {
  ok: boolean
  message: string
}

export type DeleteStatusTodoFn = (token: string, statusTodoId: number) => Promise<DeleteStatusTodoResponse>

export const deleteStatusTodo = async (token: string, statusTodoId: number): Promise<DeleteStatusTodoResponse> => {
  const response = await fetch(`${getEndpoint()}/todos/status/${statusTodoId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (response.status === 204) {
    return { ok: true, message: 'Removido com sucesso' }
  }

  if (response.status === 400) {
    const data = await response.json()
    return { ok: false, message: data.message }
  }
}
