import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await axios.get('/api/users/')

  return response.data
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getUsers.fulfilled, (state, action) => {
      // Add user to the state array
      console.log({ state }, { action })
      return action.payload
    })
  },
})

export default usersSlice.reducer
