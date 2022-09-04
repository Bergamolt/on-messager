import { createSelector } from '@reduxjs/toolkit'

const getUserId = (state) => state.auth.userId
const getUsername = (state) => state.auth.username

export const getUserIdSelector = createSelector(getUserId, (userId) => userId)
export const getUsernameSelector = createSelector(getUsername, (username) => username)
