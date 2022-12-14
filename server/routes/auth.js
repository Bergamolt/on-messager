import { Router } from 'express'
import { check, validationResult } from 'express-validator'
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const router = new Router()

let usedRefreshTokens = []

router.post(
  '/registration',
  [
    check('username', 'Invalid username').isLength({ min: 4 }),
    check('password', 'Invalid password').isLength({ min: 6 }),
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

      const { username, password } = req.body

      const isUsed = await User.findOne({ username })

      if (isUsed) {
        return res.status(300).json({ message: 'Username is exists' })
      }

      const hashedPassword = await bycrypt.hash(password, 12)

      const user = new User({
        username,
        password: hashedPassword,
      })

      user.save()

      res.json({
        token,
        userId: user.id,
        username: user.username,
      })
    } catch (err) {
      console.error(err)
    }
  }
)

router.post(
  '/login',
  [check('username', 'Invalid username').exists(), check('password', 'Empty password').exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array,
          message: 'Invalid data at registration',
        })
      }

      const { username, password } = req.body

      const user = await User.findOne({ username })

      if (!user) {
        return res.status(400).json({
          message: 'User is not found',
        })
      }

      const isMatch = await bycrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({
          message: 'Invalid password',
        })
      }

      const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '10min' })
      const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' })

      res.json({
        token: accessToken,
        refreshToken,
        userId: user.id,
      })
    } catch (err) {
      console.error(err)
    }
  }
)

router.post('/refresh', (req, res) => {
  const refreshToken = req.body?.refreshToken

  if (refreshToken && !usedRefreshTokens.includes(refreshToken)) {
    try {
      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: err.message })
        }

        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '10min' })

        return res.json({
          token: accessToken,
          refreshToken,
        })
      })
    } catch (err) {
      console.error(err)
    }
  } else {
    return res.status(401)
  }
})

router.post('/logout', (req, res) => {
  const refreshToken = req.body?.refreshToken

  if (refreshToken && !usedRefreshTokens.includes(refreshToken)) {
    usedRefreshTokens.push(refreshToken)

    res.json({ message: 'Logout successful' })
  } else {
    res.status(403)
  }
})

export default router
