import { takeEvery } from 'redux-saga/effects'

import * as actions from '../actions/actionTypes'

import * as statusTodoSagas from './todo/statusTodo'
import * as todoSagas from './todo/todo'

export default function * sagaRoot () {
  /** * Status Todo */
  yield takeEvery(actions.ADD_STATUS_TODO_REQUEST as any, statusTodoSagas.addStatusTodoRequestSaga)
  yield takeEvery(actions.GET_ALL_STATUS_TODO_REQUEST as any, statusTodoSagas.getAllStatusTodoRequestSaga)
  yield takeEvery(actions.DELETE_STATUS_TODO_REQUEST as any, statusTodoSagas.deleteStatusTodoRequestSaga)
  yield takeEvery(actions.UPDATE_STATUS_TODO_REQUEST as any, statusTodoSagas.updateStatusTodoRequestSaga)

  /** * Todo */
  yield takeEvery(actions.ADD_TODO_REQUEST as any, todoSagas.AddTodoRequestSaga)
  yield takeEvery(actions.UPDATE_TODO_REQUEST as any, todoSagas.UpdateTodoRequestSaga)
  yield takeEvery(actions.DELETE_TODO_REQUEST as any, todoSagas.DeleteTodoRequestSaga)
  yield takeEvery(actions.GET_ALL_TODO_REQUEST as any, todoSagas.GetAllTodoRequestSaga)
}
