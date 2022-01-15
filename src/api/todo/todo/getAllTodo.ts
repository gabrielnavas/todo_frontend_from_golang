import { getEndpoint } from '../../getEndpoint'
import { getImage, makeApiUrlByUrl, makeLocalUrl } from './getImage'

export type Todo = {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  statusId: number
  imageUrl?: string
}

export type GetAllTodoResponse = Todo[]

export type GetAllTodoFn = (token: string) => Promise<GetAllTodoResponse>

export const getAllTodo = async (token: string): Promise<GetAllTodoResponse> => {
  const response = await fetch(`${getEndpoint()}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (response.status !== 200) {
    throw new Error(`status is ${response.status}, but expected ${200}`)
  }

  const data: Todo[] = await response.json()

  const allTodos = await Promise.all(data.map(async (item: Todo): Promise<Todo> => {
    let imageLocalUrl: string | undefined
    if (item.imageUrl && item.imageUrl.length > 0) {
      const imageApiUrl = makeApiUrlByUrl(item.imageUrl)
      const image: File = await getImage(token, imageApiUrl, 'image')
      imageLocalUrl = makeLocalUrl(image)
    }

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
      statusId: item.statusId,
      imageUrl: imageLocalUrl
    }
  }))
  return allTodos
}
