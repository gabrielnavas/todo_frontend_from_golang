import { getEndpoint } from '../../getEndpoint'

type Params = {
  userId: number
  token: string
  payload: {
    oldPassword: string
    newPassword: string
    newPasswordConfirmation: string
  }
}

type Result = {
  ok: boolean
  message: string
}

type ChangePasswordFn = (params: Params) => Promise<Result>
export const changePassword: ChangePasswordFn = async (params: Params): Promise<Result> => {
  const url = `${getEndpoint()}/users/change_password/${params.userId}`
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${params.token}`
    },
    method: 'POST',
    body: JSON.stringify(params.payload)
  })

  if (response.status === 400) {
    const data = await response.json()
    return {
      ok: false,
      message: data.message
    }
  }

  if (response.status === 204) {
    return {
      ok: true,
      message: 'Senha alterada com sucesso'
    }
  }

  return {
    ok: false,
    message: 'Serviço fora do ar, tente novamente mais tarde.'
  }
}
