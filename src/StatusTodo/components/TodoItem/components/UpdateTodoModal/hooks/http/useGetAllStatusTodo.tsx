import { useCallback } from 'react'
import { StatusTodo, StatusTodoOptions } from '../..'
import { useApi } from '../../../../../../../shared/hooks/api/useApi'

const useGetAllStatusTodo = () => {
  const api = useApi()

  const handlerRequest = useCallback(async (statusTodoIdFilter: number): Promise<StatusTodoOptions[]> => {
    const response = await fetch(`${api.getEndpoint()}/todos/status`)
    if (response.status !== 200) {
      throw new Error('should by get all status todo return status 200 ')
    }
    const data = await response.json()

    const statusTodos = data as StatusTodo[]
    const statusTodosLessOwn = filterData(statusTodos, statusTodoIdFilter)
    return statusTodosLessOwn
  }, [])

  const filterData = (statusTodos: StatusTodo[], statusTodoId: number): StatusTodoOptions[] => {
    return statusTodos
      // .filter(statusTodo => statusTodo.id !== statusTodoId)
      .map(statusTodo => ({ label: statusTodo.name, statusTodo: statusTodo }))
  }

  return { handlerRequest }
}

export default useGetAllStatusTodo
