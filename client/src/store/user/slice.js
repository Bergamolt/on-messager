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
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
