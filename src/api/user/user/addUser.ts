import { getEndpoint } from '../../getEndpoint'

export type AddUserParam = {
  name: string
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

export type AddUserResponse = {
  id: number
  name: string
  username: string
  email: string
  createdAt: Date
  updatedAt: Date

  ok: boolean
  message: string
}

export type addStatusTodoFn = (statusTodo: AddUserParam) => Promise<AddUserResponse>

export const addUser: addStatusTodoFn = async (statusTodo: AddUserParam): Promise<AddUserResponse> => {
  const url = `${getEndpoint()}/users`
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
      ok: false,
      message: data.message
    } as AddUserResponse
  }

  if (response.status === 201) {
    return {
      id: data.id,
      name: data.name,
      username: data.username,
      email: data.email,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),

      ok: true,
      message: 'Conta criada com sucesso.'
    }
  }

  throw new Error(`expected status 201, but received ${response.status}`)
}
