import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers/reducerRoot'
import rootSagas from './sagas/sagaRoot'

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware)
    )
  ) as any
  store.sagaTask = sagaMiddleware.run(rootSagas)
  return store
}

const wrapper = createWrapper(makeStore)

export default wrapper
