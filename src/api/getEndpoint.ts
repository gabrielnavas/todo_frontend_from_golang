const getEndpoint = () => {
  const url = process.env.API_ENDPOINT
  if (!url) {
    throw new Error('you need set API_ENDPOINT on env')
  }
  return url
}

export { getEndpoint }
