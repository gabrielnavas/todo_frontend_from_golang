import { getEndpoint } from '../..'

export type DeleteTodoResponse = {
  ok: boolean
  message: string
}

export type DeleteTodoFn = (todoId: number) => Promise<DeleteTodoResponse>

export const deleteTodo = async (todoId: number): Promise<DeleteTodoResponse> => {
  const url = `${getEndpoint()}/todos/${todoId}`
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json'
    }
  })
  if (response.status !== 204) {
    const data = await response.json()
    return {
      ok: true,
      message: data.message
    }
  }
  return {
    ok: false,
    message: 'Todo deletado com sucesso'
  }
}
