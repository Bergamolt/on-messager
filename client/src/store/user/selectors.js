import { createSelector } from '@reduxjs/toolkit'

const getUserId = (state) => state.user.userId
const getUsername = (state) => state.user.username
const getFriends = (state) => state.user.friends

export const getUserIdSelector = createSelector(getUserId, (userId) => userId)
export const getUsernameSelector = createSelector(getUsername, (username) => username)
export const getFriendsSelector = createSelector(getFriends, (friends) => friends)
