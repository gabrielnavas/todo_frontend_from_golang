import { call, put } from 'redux-saga/effects'

import * as actionsTypes from '../../actions/actionTypes'
import * as actionStatusTodo from '../../actions/todo/statusTodo'
import * as statusTodoApi from '../../../api/todo/statusTodo'

import { CustomActionSaga } from '../sagasType'

export function * addStatusTodoRequestSaga (actionParam: CustomActionSaga<actionsTypes.AddStatusTodoRequest>) {
  try {
    const statusTodo: statusTodoApi.AddStatusTodoResponse = yield call<statusTodoApi.addStatusTodoFn>(statusTodoApi.addStatusTodo, { name: actionParam.payload.name })
    yield put(actionStatusTodo.addStatusTodoSuccess({
      id: statusTodo.id,
      name: statusTodo.name,
      createdAt: statusTodo.createdAt,
      updatedAt: statusTodo.updatedAt
    }))
  } catch (e) {
    yield put(actionStatusTodo.addStatusTodoFail({ message: e.message }))
  }
}

export function * getAllStatusTodoRequestSaga () {
  try {
    const statusTodos: statusTodoApi.GetAllStatusTodoResponse = yield call<statusTodoApi.GetAllStatusTodoFn>(statusTodoApi.getAllStatusTodo)
    yield put(actionStatusTodo.getAllStatusTodoSuccess(statusTodos))
  } catch (e) {
    yield put(actionStatusTodo.getAllStatusTodoFail({ message: e.message }))
  }
}

export function * deleteStatusTodoRequestSaga (actionParam: CustomActionSaga<actionsTypes.DeleteStatusTodoRequest>) {
  try {
    const response: statusTodoApi.DeleteStatusTodoResponse = yield call<statusTodoApi.DeleteStatusTodoFn>(statusTodoApi.deleteStatusTodo, actionParam.payload.statusTodoId)
    if (response.ok) {
      yield put(actionStatusTodo.deleteStatusTodoSuccess({
        messageOk: response.message,
        usecaseError: '',
        statusTodoId: actionParam.payload.statusTodoId
      }))
    } else {
      yield put(actionStatusTodo.deleteStatusTodoSuccess({
        messageOk: '',
        usecaseError: response.message,
        statusTodoId: actionParam.payload.statusTodoId
      }))
    }
  } catch (e) {
    yield put(actionStatusTodo.deleteStatusTodoFail({ message: e.message }))
  }
}

export function * updateStatusTodoRequestSaga (actionParam: CustomActionSaga<actionsTypes.UpdateStatusTodoRequest>) {
  try {
    const response: statusTodoApi.UpdateStatusTodoResponse =
      yield call<statusTodoApi.UpdateStatusTodoFn>(statusTodoApi.updateStatusTodo, actionParam.payload)
    if (response.ok) {
      yield put(actionStatusTodo.updateStatusTodoSuccess({
        id: actionParam.payload.id,
        name: actionParam.payload.name,
        messageOk: response.message,
        usecaseError: ''
      }))
    } else {
      yield put(actionStatusTodo.updateStatusTodoSuccess({
        id: actionParam.payload.id,
        name: actionParam.payload.name,
        messageOk: '',
        usecaseError: response.message
      }))
    }
  } catch (e) {
    yield put(actionStatusTodo.deleteStatusTodoFail({ message: e.message }))
  }
}
