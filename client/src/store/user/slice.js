import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: null,
  username: null,
  friends: [],
}

initialState.userId = JSON.parse(localStorage.getItem('userId'))

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem('userId', JSON.stringify(action.payload._id))
      state.userId = action.payload._id
      state.username = action.payload.username
      state.friends = action.payload.friends
    },

    setUserOnline: (state, action) => {
      state.friends = state.friends?.map((friend) =>
        friend.username === action.payload ? { ...friend, online: true } : friend
      )
    },

    setUserOffline: (state, action) => {
      state.friends = state.friends?.map((friend) =>
        friend.username === action.payload ? { ...friend, online: false } : friend
      )
    },
  },
})

export const { actions } = userSlice

export default userSlice.reducer
