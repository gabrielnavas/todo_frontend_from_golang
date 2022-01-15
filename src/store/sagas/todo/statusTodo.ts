import { call, put, select } from 'redux-saga/effects'

import * as actionsTypes from '../../actions/actionTypes'
import * as actionStatusTodo from '../../actions/todo/statusTodo'
import * as statusTodoApi from '../../../api/todo/statusTodo'

import { CustomActionSaga, SelectState } from '../sagasType'
import { Reducers } from '../../reducers/reducerRoot'

export function * addStatusTodoRequestSaga (actionParam: CustomActionSaga<actionsTypes.AddStatusTodoRequest>) {
  try {
    const state: Reducers = yield select<SelectState>(state => state)
    const token = state.userStore.token
    const statusTodo: statusTodoApi.AddStatusTodoResponse = yield call<statusTodoApi.addStatusTodoFn>(
      statusTodoApi.addStatusTodo, token, { name: actionParam.payload.name }
    )

    if (statusTodo.ok) {
      yield put(actionStatusTodo.addStatusTodoSuccess({
        id: statusTodo.id,
        name: statusTodo.name,
        createdAt: statusTodo.createdAt,
        updatedAt: statusTodo.updatedAt,

        messageOk: statusTodo.message,
        usecaseError: ''
      }))
    } else {
      yield put(actionStatusTodo.addStatusTodoSuccess({
        id: statusTodo.id,
        name: statusTodo.name,
        createdAt: statusTodo.createdAt,
        updatedAt: statusTodo.updatedAt,

        messageOk: '',
        usecaseError: statusTodo.message
      }))
    }
  } catch (e) {
    yield put(actionStatusTodo.addStatusTodoFail({ message: e.message }))
  }
}

export function * getAllStatusTodoRequestSaga () {
  try {
    const state: Reducers = yield select<SelectState>(state => state)
    const token = state.userStore.token
    const statusTodos: statusTodoApi.GetAllStatusTodoResponse = yield call<statusTodoApi.GetAllStatusTodoFn>(statusTodoApi.getAllStatusTodo, token)
    yield put(actionStatusTodo.getAllStatusTodoSuccess(statusTodos))
  } catch (e) {
    yield put(actionStatusTodo.getAllStatusTodoFail({ message: e.message }))
  }
}

export function * deleteStatusTodoRequestSaga (actionParam: CustomActionSaga<actionsTypes.DeleteStatusTodoRequest>) {
  try {
    const state: Reducers = yield select<SelectState>(state => state)
    const token = state.userStore.token
    const response: statusTodoApi.DeleteStatusTodoResponse = yield call<statusTodoApi.DeleteStatusTodoFn>(statusTodoApi.deleteStatusTodo, token, actionParam.payload.statusTodoId)
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
    const state: Reducers = yield select<SelectState>(state => state)
    const token = state.userStore.token
    const response: statusTodoApi.UpdateStatusTodoResponse =
      yield call<statusTodoApi.UpdateStatusTodoFn>(statusTodoApi.updateStatusTodo, token, actionParam.payload)
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
