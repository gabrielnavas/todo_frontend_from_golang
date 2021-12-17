const useApi = () => {
  const getEndpoint = () => process.env.API_ENDPOINT || 'http://localhost:3000'

  return { getEndpoint }
}

export { useApi }
