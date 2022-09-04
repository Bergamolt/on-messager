import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  messages: [],
  id: null,
}

const storageState = JSON.parse(localStorage.getItem('selectedChat'))

export const selectedChatSlice = createSlice({
  name: 'selectedChat',
  initialState: storageState || initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      localStorage.setItem('selectedChat', JSON.stringify(action.payload))

      return action.payload
    },
  },
})

export const { setSelectedChat } = selectedChatSlice.actions

export default selectedChatSlice.reducer
