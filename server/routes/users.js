import { Router } from 'express'
import User from '../models/user.js'

const router = new Router()

router.get('/', async (req, res) => {
  try {
    const users = await User.find({}).select('-password')

    res.send(users)
  } catch (error) {
    console.log({ error })
  }
})

export default router
