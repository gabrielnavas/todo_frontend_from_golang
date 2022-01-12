import { call, put } from 'redux-saga/effects'

import * as actionsTypes from '../../actions/actionTypes'
import * as actionLoginUser from '../../actions/user/login'
import * as loginUserApi from '../../../api/user/login/loginUser'

import { CustomActionSaga } from '../sagasType'

export function * loginUserRequestSaga (actionParam: CustomActionSaga<actionsTypes.LoginUserRequest>) {
  try {
    const payload: loginUserApi.LoginUserParam = {
      username: actionParam.payload.username,
      password: actionParam.payload.password
    }
    const resultRequest: loginUserApi.LoginUserResponse = yield call<loginUserApi.loginUserFn>(loginUserApi.loginUser, payload)
    if (resultRequest.ok) {
      yield put(actionLoginUser.loginUserSuccess({
        token: resultRequest.token,
        user: resultRequest.user,
        messageOk: resultRequest.message,
        usecaseError: ''
      }))
    } else {
      yield put(actionLoginUser.loginUserSuccess({
        token: resultRequest.token,
        user: resultRequest.user,
        messageOk: '',
        usecaseError: resultRequest.message
      }))
    }
  } catch (e) {
    yield put(actionLoginUser.loginUserFail({ message: e.message }))
  }
}
