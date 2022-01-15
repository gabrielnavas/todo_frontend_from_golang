import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'

import rootReducer from './reducers/reducerRoot'
import rootSagas from './sagas/sagaRoot'
import syncStorage from './syncStorage'

// BINDING MIDDLEWARE
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const isServer = typeof window === 'undefined'

  if (isServer) {
    // If it's on server side, create a store
    return createStore(rootReducer, bindMiddleware([sagaMiddleware]))
  } else {
    // If it's on client side, create a store which will persist
    const { persistStore, persistReducer } = require('redux-persist')

    const persistConfig = {
      key: 'nextjs',
      whitelist: ['statusTodoStore', 'userStore', 'messagesStore'], // only counter will be persisted, add other reducers if needed
      storage: syncStorage // if needed, use a safer storage
    }

    const persistedReducer = persistReducer(persistConfig, rootReducer) // Create a new reducer with our existing reducer

    const store = createStore(
      persistedReducer,
      bindMiddleware([sagaMiddleware])
    ) as any // Creating the store again

    store.sagaTask = sagaMiddleware.run(rootSagas)
    store.__persistor = persistStore(store) // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store
  }
}

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper(makeStore)
