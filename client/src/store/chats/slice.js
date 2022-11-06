import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedChat: null,
  messages: [],
}

initialState.selectedChat = JSON.parse(localStorage.getItem('selectedChat'))

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      localStorage.setItem('selectedChat', JSON.stringify(action.payload))
      state.selectedChat = action.payload
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
  },
})

export const { setSelectedChat, setMessages } = chatSlice.actions

export default chatSlice.reducer
