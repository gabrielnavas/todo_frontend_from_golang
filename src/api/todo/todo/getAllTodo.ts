import { getEndpoint } from '../../getEndpoint'

export type GetAllTodoResponse = {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  statusId: number
  imageUrl?: string
}[]

export type GetAllTodoFn = () => Promise<GetAllTodoResponse>

export const getAllTodo = async (): Promise<GetAllTodoResponse> => {
  const optionalImageUrl = (imageUrl: string) => {
    let imagePath: string | undefined

    if (imageUrl && imageUrl.length > 0) {
      imagePath = `${getEndpoint()}${imageUrl}`
    }

    return imagePath
  }

  const response = await fetch(`${getEndpoint()}/todos`)

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
}
