import { combineReducers, configureStore } from '@reduxjs/toolkit'
import auth from './auth/slice'
import user from './user/slice'
import chat from './chats/slice'

const appReducer = combineReducers({
  auth,
  user,
  chat,
})

const reducerProxy = (state, action) => {
  if (action.type === 'auth/LOGOUT') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export const store = configureStore({
  reducer: reducerProxy,
})
