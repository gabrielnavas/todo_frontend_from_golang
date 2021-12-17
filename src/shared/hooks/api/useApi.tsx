const useApi = () => {
  const getEndpoint = () => process.env.API_ENDPOINT || 'http://localhost:8080'

  return { getEndpoint }
}

export { useApi }
