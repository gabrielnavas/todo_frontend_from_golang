import { useCallback, useState } from 'react'

import { useApi } from '../../../../../shared/hooks/api/useApi'

type StatusTodoDto = {
  name: string
}

type StatusTodoResponse = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date

  messageError?: string
}


const useCreateStatusTodo = () => {
  const api = useApi()

  const handlerRequest = useCallback(async (payload: StatusTodoDto): Promise<StatusTodoResponse> => {
    const url = `${api.getEndpoint()}/todos/status`
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(payload)
    })

  
    const data = await response.json()

    if (response.status === 400) {
      return {
        messageError: data.message
      } as StatusTodoResponse
    }

    if (response.status === 201) {
      return {
        id: data.id,
        name: data.name,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt)
      }
    }

    throw new Error(`expected status 201, but received ${response.status}`)
  }, [])


  return { 
    handlerRequest,
  }
}

export { useCreateStatusTodo }
