import { Router } from 'express'
import Messages from '../models/messages.js'

const router = new Router()

router.get('/get', async (req, res) => {
  try {
    const { from, to } = req.query

    const messages = await (
      await Messages.find({ from, to })
    ).concat(from !== to ? await Messages.find({ from: to, to: from }) : [])

    res.send(messages.sort((a, b) => a.date - b.date))
  } catch (error) {
    console.log({ error })
  }
})

// router.post('/add', async (res, req) => {
//   try {
//     const { content, from, to } = req.body

//     const message = new Messages({ content, from, to })

//     await message.save()

//     res.send(message)
//   } catch (error) {
//     console.log({ error })
//   }
// })

export default router
