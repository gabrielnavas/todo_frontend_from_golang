import { getEndpoint } from '../../getEndpoint'

export const getImage = async (token: string, urlImage: string, fileName: string): Promise<File> => {
  const response = await fetch(urlImage, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const blob = await response.blob()
  const b: any = blob
  b.lastModifiedDate = new Date()
  b.name = fileName
  return blob as File
}

export const makeApiUrlById = (todoId: number): string => {
  return `${getEndpoint()}/todos/image/${todoId}`
}

export const makeApiUrlByUrl = (url: string): string => {
  return `${getEndpoint()}${url}`
}

export const makeLocalUrl = (image: File): string => {
  return URL.createObjectURL(image)
}
