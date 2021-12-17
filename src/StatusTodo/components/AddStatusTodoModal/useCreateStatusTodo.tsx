import { useCallback } from 'react'
import { useApi } from '../../../shared/hooks/api/useApi'

type StatusTodoDto = {
  name: string
}

type StatusTodo = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

// TODO: FALTA TESTA ISSO DAQUI :)
const useCreateStatusTodo = () => {
  const api = useApi()

  const handler = useCallback(async (payload: StatusTodoDto): Promise<StatusTodo> => {
    const url = `${api.getEndpoint()}/todo/status`
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(payload)

    })
    if (response.status !== 201) {
      throw new Error(`expected status 201, but received ${response.status}`)
    }
    const data = await response.json()
    return {
      id: data.id,
      name: data.name,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    }
  }, [])

  return { handler }
}

export { useCreateStatusTodo }
