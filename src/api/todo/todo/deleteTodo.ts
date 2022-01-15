import { getEndpoint } from '../../getEndpoint'

export type DeleteTodoResponse = {
  ok: boolean
  message: string
}

export type DeleteTodoFn = (token: string, todoId: number) => Promise<DeleteTodoResponse>

export const deleteTodo = async (token: string, todoId: number): Promise<DeleteTodoResponse> => {
  const url = `${getEndpoint()}/todos/${todoId}`
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  if (response.status !== 204) {
    const data = await response.json()
    const messageCapitalize = `${data.message[0].toLocaleUpperCase()}${data.message.slice(1)}.`
    return {
      ok: false,
      message: messageCapitalize
    }
  }
  return {
    ok: true,
    message: 'Todo deletado com sucesso'
  }
}
