import { configureStore } from '@reduxjs/toolkit'
import auth from './auth'
import users from './users'
import selectedChat from './chats'

export const store = configureStore({
  reducer: {
    auth,
    users,
    selectedChat,
  },
})
