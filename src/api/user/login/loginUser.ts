import { getEndpoint } from '../../getEndpoint'

export type LoginUserParam = {
  username: string
  password: string
}

export type LoginUserResponse = {
  token: string
  user: {
    id: number
    name: string
    username: string
    email: string
    levelAccess: number
    createdAt: Date
    updatedAt: Date
  }

  ok: boolean
  message: string
}

export type loginUserFn = (params: LoginUserParam) => Promise<LoginUserResponse>

export const loginUser: loginUserFn = async (params: LoginUserParam): Promise<LoginUserResponse> => {
  const url = `${getEndpoint()}/users/login`
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(params)
  })

  const data = await response.json()

  if (response.status === 400) {
    return {
      ok: false,
      message: data.message
    } as LoginUserResponse
  }

  if (response.status === 201) {
    return {
      token: data.token,
      user: {
        id: data.id,
        name: data.name,
        username: data.username,
        email: data.email,
        levelAccess: data.levelAccess,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt)
      },

      ok: true,
      message: 'Logado com successo!'
    }
  }

  throw new Error(`expected status 201, but received ${response.status}`)
}
