import { createSelector } from '@reduxjs/toolkit'
import { getUsernameSelector } from '../user/selectors'

const getSelectedChat = (state) => state.chat.selectedChat?.username
const getMessages = (state) => state.chat.messages

export const getSelectedChatSelector = createSelector(
  getSelectedChat,
  getUsernameSelector,
  (selectedChat, username) => selectedChat ?? username
)
export const getMessagesSelector = createSelector(getMessages, (messages) => messages)
