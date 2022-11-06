import { Router } from 'express'
import User from '../models/user.js'

const router = new Router()

router.post('/', async (req, res) => {
  try {
    const { userId } = req.body

    const user = await User.findOne({ _id: userId }, '-password')

    res.send(user)
  } catch (error) {
    console.log({ error })
  }
})

export default router
