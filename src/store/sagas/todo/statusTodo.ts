import { call, put, select } from 'redux-saga/effects'

import * as actionsTypes from '../../actions/actionTypes'

import * as actionStatusTodo from '../../actions/todo/statusTodo'
import * as actionMessages from '../../actions/messages/messages'

import * as statusTodoApi from '../../../api/todo/statusTodo'

import { CustomActionSaga, SelectState } from '../sagasType'

import { Reducers } from '../../reducers/reducerRoot'

export function * addStatusTodoRequestSaga (actionParam: CustomActionSaga<actionsTypes.AddStatusTodoRequest>) {
  try {
    const state: Reducers = yield select<SelectState>(state => state)
    const token = state.userStore.token
    const response: statusTodoApi.AddStatusTodoResponse = yield call<statusTodoApi.addStatusTodoFn>(
      statusTodoApi.addStatusTodo, token, { name: actionParam.payload.name }
    )

    yield put(actionStatusTodo.addStatusTodoSuccess({
      id: response.id,
      name: response.name,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt
    }))

    if (response.ok) {
      yield put(actionMessages.AddMessagesSuccess({ messagesSuccess: [response.message] }))
    } else {
      yield put(actionMessages.AddMessageUsecaseError({ usecaseErrors: [response.message] }))
    }
  } catch (e) {
    yield put(actionStatusTodo.addStatusTodoFail())
    yield put(actionMessages.AddMessageServerError({ serverErrors: [e.message] }))
  }
}

export function * getAllStatusTodoRequestSaga () {
  try {
    const state: Reducers = yield select<SelectState>(state => state)
    const token = state.userStore.token
    const statusTodos: statusTodoApi.GetAllStatusTodoResponse = yield call<statusTodoApi.GetAllStatusTodoFn>(statusTodoApi.getAllStatusTodo, token)
    yield put(actionStatusTodo.getAllStatusTodoSuccess(statusTodos))
  } catch (e) {
    yield put(actionStatusTodo.getAllStatusTodoFail())
    yield put(actionMessages.AddMessageServerError({ serverErrors: [e.message] }))
  }
}

export function * deleteStatusTodoRequestSaga (actionParam: CustomActionSaga<actionsTypes.DeleteStatusTodoRequest>) {
  try {
    const state: Reducers = yield select<SelectState>(state => state)
    const token = state.userStore.token
    const response: statusTodoApi.DeleteStatusTodoResponse = yield call<statusTodoApi.DeleteStatusTodoFn>(statusTodoApi.deleteStatusTodo, token, actionParam.payload.statusTodoId)

    yield put(actionStatusTodo.deleteStatusTodoSuccess({
      statusTodoId: actionParam.payload.statusTodoId
    }))

    if (response.ok) {
      yield put(actionMessages.AddMessagesSuccess({ messagesSuccess: [response.message] }))
    } else {
      yield put(actionMessages.AddMessageUsecaseError({ usecaseErrors: [response.message] }))
    }
  } catch (e) {
    yield put(actionStatusTodo.deleteStatusTodoFail())
    yield put(actionMessages.AddMessageServerError({ serverErrors: [e.message] }))
  }
}

export function * updateStatusTodoRequestSaga (actionParam: CustomActionSaga<actionsTypes.UpdateStatusTodoRequest>) {
  try {
    const state: Reducers = yield select<SelectState>(state => state)
    const token = state.userStore.token
    const response: statusTodoApi.UpdateStatusTodoResponse = yield call<statusTodoApi.UpdateStatusTodoFn>(statusTodoApi.updateStatusTodo, token, actionParam.payload)

    yield put(actionStatusTodo.updateStatusTodoSuccess({
      id: actionParam.payload.id,
      name: actionParam.payload.name
    }))

    if (response.ok) {
      yield put(actionMessages.AddMessagesSuccess({ messagesSuccess: [response.message] }))
    } else {
      yield put(actionMessages.AddMessageUsecaseError({ usecaseErrors: [response.message] }))
    }
  } catch (e) {
    yield put(actionStatusTodo.deleteStatusTodoFail())
    yield put(actionMessages.AddMessageServerError({ serverErrors: [e.message] }))
  }
}
