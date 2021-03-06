import {Router} from 'express'
import {check, validationResult} from 'express-validator'
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const router = new Router()

router.post(
  '/registration',
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Invalid password').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array,
          message: 'Invalid data at registration',
        })
      }

      const {email, password} = req.body

      const isUsed = await User.findOne({email})

      if (isUsed) {
        return res.status(300).json({message: 'Email address is exists'})
      }

      const hashedPassword = await bycrypt.hash(password, 12)

      const user = new User({
        email,
        password: hashedPassword,
      })

      user.save()

      res.status(200).json({message: 'Created user'})
    } catch (err) {
      console.error(err)
    }
  }
)

router.post(
  '/login',
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Empty password').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array,
          message: 'Invalid data at registration',
        })
      }

      const {email, password} = req.body

      const user = await User.findOne({email})

      if (!user) {
        return res.status(400).json({
          message: 'User is not found',
        })
      }

      const isMatch = bycrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({
          message: 'Invalid password',
        })
      }

      const jwtSecret = 'secret'

      const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' })
      
      res.json({
        token,
        userId: user.id
      })
    } catch (err) {
      console.error(err)
    }
  }
)

export default router
