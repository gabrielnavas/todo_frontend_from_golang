import { useCallback, useState } from 'react'

import { useApi } from '../../../../shared/hooks/api/useApi'

type Todo = {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  statusId: number
  imageUrl?: string
}

const useGetTodoList = () => {
  const [isLoading, setIsloading] = useState(false)
  const api = useApi()

  const optionalImageUrl = useCallback((imageUrl: string) => {
    let imagePath: string | undefined

    if (imageUrl && imageUrl.length > 0) {
      imagePath = `${api.getEndpoint()}${imageUrl}`
    }

    return imagePath
  }, [])

  const handler = useCallback(async (): Promise<Todo[]> => {
    setIsloading(true)
    const response = await fetch(`${api.getEndpoint()}/todos`)
    setIsloading(false)

    if (response.status !== 200) {
      throw new Error(`status is ${response.status}, but expected ${200}`)
    }

    const data = await response.json()

    return data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
      statusId: item.statusId,
      imageUrl: optionalImageUrl(item.imageUrl)
    }))
  }, [fetch])

  return {
    handler,
    isLoading
  }
}

export { useGetTodoList }
