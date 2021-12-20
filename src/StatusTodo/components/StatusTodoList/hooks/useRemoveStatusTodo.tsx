import { useCallback } from "react"

import { useApi } from "../../../../shared/hooks/api/useApi"

const useRemoveStatusTodo = () => {
  const api = useApi()
  
  const handle = useCallback(async (statusTodoId: number): Promise<{ok: boolean, message: string}> => {
    const response = await fetch(`${api.getEndpoint()}/todos/status/${statusTodoId}`, {
      method: "DELETE"
    })

    if (response.status === 204) {
      return {ok: true, message: 'Removido com sucesso'}
    }

    if (response.status === 400) {
      const data = await response.json()
      return {ok: false, message: data.message}
    }
  }, [])
  return {handle}
}

export {useRemoveStatusTodo}