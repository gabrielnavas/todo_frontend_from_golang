import { call, put } from 'redux-saga/effects'

import * as actionsTypes from '../../actions/actionTypes'
import * as todoApi from '../../../api/todo/todo'
import * as actionTodo from '../../actions/todo/todo'

import { CustomActionSaga } from '../sagasType'

export function * AddTodoRequestSaga (action: CustomActionSaga<actionsTypes.AddTodoRequest>) {
  try {
    const response: todoApi.AddTodoResult = yield call<todoApi.AddTodoFn>(todoApi.addTodo, action.payload)
    if (response.ok) {
      yield put(actionTodo.addTodoSuccess({
        id: response.todo.id,
        title: response.todo.title,
        description: response.todo.description,
        imageUrl: response.todo.imageUrl,
        createdAt: response.todo.createdAt,
        updatedAt: response.todo.updatedAt,
        statusId: response.todo.statusId,
        messageOk: response.message,
        usecaseError: ''
      }))
    } else {
      yield put(actionTodo.addTodoSuccess({
        id: response.todo.id,
        title: response.todo.title,
        description: response.todo.description,
        imageUrl: response.todo.imageUrl,
        createdAt: response.todo.createdAt,
        updatedAt: response.todo.updatedAt,
        statusId: response.todo.statusId,
        messageOk: '',
        usecaseError: response.message
      }))
    }
  } catch (e) {
    yield put(actionTodo.addTodoFail({ message: e.message }))
  }
}

export function * UpdateTodoRequestSaga (action: CustomActionSaga<actionsTypes.UpdateTodoRequest>) {
  try {
    const response: todoApi.UpdateTodoResult = yield call<todoApi.UpdateTodoFn>(todoApi.updateTodo, action.payload)
    if (response.ok) {
      yield put(actionTodo.updateTodoSuccess({
        id: response.todo.id,
        title: response.todo.title,
        description: response.todo.description,
        imageUrl: response.todo.imageUrl,
        createdAt: response.todo.createdAt,
        updatedAt: response.todo.updatedAt,
        statusId: response.todo.statusId,
        messageOk: response.message,
        usecaseError: ''
      }))
    } else {
      yield put(actionTodo.updateTodoSuccess({
        id: response.todo.id,
        title: response.todo.title,
        description: response.todo.description,
        imageUrl: response.todo.imageUrl,
        createdAt: response.todo.createdAt,
        updatedAt: response.todo.updatedAt,
        statusId: response.todo.statusId,
        messageOk: '',
        usecaseError: response.message
      }))
    }
  } catch (e) {
    yield put(actionTodo.updateTodoFail({ message: e.message }))
  }
}

export function * DeleteTodoRequestSaga (action: CustomActionSaga<actionsTypes.DeleteTodoRequest>) {
  try {
    const response: todoApi.UpdateTodoResult = yield call<todoApi.DeleteTodoFn>(todoApi.deleteTodo, action.payload.todoId)
    if (response.ok) {
      yield put(actionTodo.deleteTodoSuccess({
        todoId: action.payload.todoId,
        statusId: action.payload.statusId,
        messageOk: response.message,
        usecaseError: ''
      }))
    } else {
      yield put(actionTodo.deleteTodoSuccess({
        todoId: action.payload.todoId,
        statusId: action.payload.statusId,
        messageOk: '',
        usecaseError: response.message
      }))
    }
  } catch (e) {
    yield put(actionTodo.deleteTodoFail({ message: e.message }))
  }
}

export function * GetAllTodoRequestSaga (action: CustomActionSaga<actionsTypes.DeleteTodoRequest>) {
  try {
    const allTodos: todoApi.GetAllTodoResponse = yield call<todoApi.GetAllTodoFn>(todoApi.getAllTodo)
    yield put(actionTodo.getAllTodoSuccess(allTodos))
  } catch (e) {
    yield put(actionTodo.getAllTodoFail({ message: e.message }))
  }
}
