import { getEndpoint } from '../../getEndpoint'

export const deleteImage = async (token: string, todoId: number): Promise<Response> => {
  const url = `${getEndpoint()}/todos/image/${todoId}`
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}
