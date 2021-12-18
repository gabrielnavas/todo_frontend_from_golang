import { useCallback, useState } from 'react'

import { useApi } from '../../../../shared/hooks/api/useApi'

type StatusTodo = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

const useGetStatusTodoList = () => {
  const [isLoading, setIsloading] = useState(false)
  const api = useApi()

  const handler = useCallback(async (): Promise<StatusTodo[]> => {
    setIsloading(true)
    const response = await fetch(`${api.getEndpoint()}/todos/status`)
    setIsloading(false)
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
  }, [fetch])

  return {
    handler,
    isLoading
  }
}

export { useGetStatusTodoList }
