import { call, put } from 'redux-saga/effects'

import * as actionsTypes from '../../actions/actionTypes'

import * as actionLoginUser from '../../actions/user/login'
import * as actionMessages from '../../actions/messages/messages'

import * as loginUserApi from '../../../api/user/login/loginUser'

import { CustomActionSaga } from '../sagasType'

export function * loginUserRequestSaga (actionParam: CustomActionSaga<actionsTypes.LoginUserRequest>) {
  try {
    const payload: loginUserApi.LoginUserParam = {
      username: actionParam.payload.username,
      password: actionParam.payload.password
    }
    const response: loginUserApi.LoginUserResponse = yield call<loginUserApi.loginUserFn>(loginUserApi.loginUser, payload)

    yield put(actionLoginUser.loginUserSuccess({
      token: response.token,
      user: response.user
    }))

    if (response.ok) {
      yield put(actionMessages.AddMessagesSuccess({ messagesSuccess: [response.message] }))
    } else {
      yield put(actionMessages.AddMessageUsecaseError({ usecaseErrors: [response.message] }))
    }
  } catch (e) {
    yield put(actionLoginUser.loginUserFail())
    yield put(actionMessages.AddMessageServerError({ serverErrors: [e.message] }))
  }
}
