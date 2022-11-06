import User from '../models/user.js'

export const addFriend = async (from, to) => {
  if (from !== to) {
    const userFrom = await User.findOne({ username: from })
    const userTo = await User.findOne({ username: to })

    const hasFriendFrom = await userFrom.friends.find((friend) => friend.username === to)
    const hasFriendTo = await userTo.friends.find((friend) => friend.username === from)

    if (!hasFriendFrom && !hasFriendTo) {
      userFrom.friends.push({ username: userTo.username })
      userTo.friends.push({ username: userFrom.username })

      await userFrom.save()
      await userTo.save()
    }
  }
}
