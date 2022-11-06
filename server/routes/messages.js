import { Router } from 'express'
import Messages from '../models/messages.js'

const router = new Router()

router.get('/get', async (req, res) => {
  try {
    const { from, to } = req.query

    const limitMessages = from !== to ? 100 : 200
    const firstMessages = await Messages.find({ from, to }).limit(limitMessages)
    const secondMessages = from !== to ? await Messages.find({ from: to, to: from }).limit(limitMessages) : []
    const messages = firstMessages.concat(secondMessages)

    res.send(messages.sort((a, b) => a.date - b.date))
  } catch (error) {
    console.log({ error })
  }
})

export default router
