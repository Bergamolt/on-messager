import { createSelector } from '@reduxjs/toolkit'

const getSelectedChat = (state) => state.selectedChat

export const getSelectedChatSelector = createSelector(getSelectedChat, (selectedChat) => selectedChat)
