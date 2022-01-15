import { getEndpoint } from '../../getEndpoint'

export type GetAllStatusTodoResponse = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}[]

export type GetAllStatusTodoFn = (token: string) => Promise<GetAllStatusTodoResponse>

export const getAllStatusTodo: GetAllStatusTodoFn = async (token: string): Promise<GetAllStatusTodoResponse> => {
  const response = await fetch(`${getEndpoint()}/todos/status`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (response.status !== 200) {
    throw new Error(`status is ${response.status}, but expected ${200}`)
  }
  const data = await response.json()

  return data.map(item => ({
    id: item.id,
    name: item.name,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt)
  }))
}
