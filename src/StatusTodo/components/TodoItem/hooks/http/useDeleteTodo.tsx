import { useCallback } from 'react'

import { useApi } from '../../../../../shared/hooks/api/useApi'

const useDeleteTodo = () => {
  const api = useApi()

  const handler = useCallback(async (todoId: number): Promise<{hasError: boolean, message: string}> => {
    const url = `${api.getEndpoint()}/todos/${todoId}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json'
      }
    })
    if (response.status !== 204) {
      const data = await response.json()
      return {
        hasError: true,
        message: data.message
      }
    }
    return {
      hasError: false,
      message: 'Todo deletado com sucesso'
    }
  }, [api.getEndpoint])
  return { handler }
}

export { useDeleteTodo }
