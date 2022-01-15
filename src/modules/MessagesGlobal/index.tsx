import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useAlert } from '../../hooks/alert/useAlert'

import { resetAllMessages } from '../../store/actions/messages/messages'

import { Reducers } from '../../store/reducers/reducerRoot'

const MessagesGlobal = () => {
  const alerts = useAlert()
  const dispatch = useDispatch()

  const store = useSelector<Reducers, Reducers>(state => state)

  // watch message ok
  useEffect(() => {
    if (store.messagesStore.messagesSuccess.length === 0) {
      return
    }
    const messagesSuccess = [...store.messagesStore.messagesSuccess]
    messagesSuccess.forEach(message => alerts.handle('success', message))
    dispatch(resetAllMessages())
  }, [store.messagesStore.messagesSuccess])

  // watch usecase error
  useEffect(() => {
    if (store.messagesStore.usecaseErrors.length === 0) {
      return
    }
    const usecaseErrors = [...store.messagesStore.usecaseErrors]
    usecaseErrors.forEach(message => alerts.handle('warning', message))
    dispatch(resetAllMessages())
  }, [store.messagesStore.usecaseErrors])

  // watch server error
  useEffect(() => {
    if (store.messagesStore.serverErrors.length === 0) {
      return
    }
    const serverErrors = [...store.messagesStore.serverErrors]
    serverErrors.forEach(message => alerts.handle('error', message))
    dispatch(resetAllMessages())
  }, [store.messagesStore.serverErrors])

  return <></>
}

export default MessagesGlobal
