import { useCallback } from 'react'

import { useApi } from '../../../../../../../shared/hooks/api/useApi'

type StatusTodoDto = {
  id: number
  name: string
}

type Result = {
  hasError: boolean
  message: string
}

const useUpdateStatusTodo = () => {
  const api = useApi()

  const handlerRequest = useCallback(async (payload: StatusTodoDto): Promise<Result> => {
    const url = `${api.getEndpoint()}/todos/status/${payload.id}`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(payload)
    })

    if (response.status === 400) {
      const data = await response.json()
      return {
        hasError: true,
        message: data.message
      }
    }

    if (response.status === 204) {
      return {
        hasError: false,
        message: 'Status todo atualizado!'
      }
    }

    throw new Error(`expected status 204, but received ${response.status}`)
  }, [])

  return {
    handlerRequest
  }
}

export { useUpdateStatusTodo }
