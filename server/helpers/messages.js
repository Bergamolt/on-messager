import Messages from '../models/messages.js'
import User from '../models/user.js'

export const addMessage = async (content, from, to) => {
  try {
    const message = new Messages({ content, from, to, date: Date.now() })

    await message.save()

    // const user = await User.findOne({ email: from })
    // const user
    // console.log(await User.findOne({ email: from }).select('frieds').findOne({ email: to }))

    //user.friends.push(await User.findOne({ email: to }))
    //user.save()

    return message
  } catch (error) {
    console.log({ error })
  }
}
