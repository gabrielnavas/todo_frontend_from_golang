import { getEndpoint } from '../../getEndpoint'

export const patchImage = async (token: string, todoId: number, image: File): Promise<Response> => {
  const url = `${getEndpoint()}/todos/image/${todoId}`
  const formFileImageName = 'image'
  const formData = new FormData()
  formData.set(formFileImageName, image, image.name)
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })
  return response
}
