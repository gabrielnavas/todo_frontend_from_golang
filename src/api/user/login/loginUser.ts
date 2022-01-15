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
    const messageCapitalize = `${data.message[0].toLocaleUpperCase()}${data.message.slice(1)}.`
    return {
      ok: false,
      message: messageCapitalize
    } as LoginUserResponse
  }

  if (response.status === 201) {
    return {
      token: data.token,
      user: {
        id: data.user.id,
        name: data.user.name,
        username: data.user.username,
        email: data.user.email,
        levelAccess: data.user.levelAccess,
        createdAt: new Date(data.user.createdAt),
        updatedAt: new Date(data.user.updatedAt)
      },

      ok: true,
      message: 'Logado com successo!'
    }
  }

  throw new Error(`expected status 201, but received ${response.status}`)
}
