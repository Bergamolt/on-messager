import { createSlice } from '@reduxjs/toolkit'

const cleanState = {
  token: null,
  userId: null,
  username: null,
}

const data = JSON.parse(localStorage.getItem('auth'))

const initialState = data || cleanState

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem('auth', JSON.stringify(action.payload))

      return action.payload
    },
    logout: () => {
      localStorage.removeItem('auth')

      return cleanState
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
