import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  userId: null,
}

initialState.token = JSON.parse(localStorage.getItem('token'))?.token

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      localStorage.setItem('token', JSON.stringify(action.payload.token))
      state.token = action.payload.token
      state.userId = action.payload.userId
    },
  },
})

export const { setAuth } = authSlice.actions

export default authSlice.reducer
