import Messages from '../models/messages.js'
import { addFriend } from './friends.js'

export const addMessage = async (content, from, to) => {
  try {
    await addFriend(from, to)

    const message = new Messages({ content, from, to, date: Date.now() })

    await message.save()

    return message
  } catch (error) {
    console.log({ error })
  }
}
